import { forwardRef, useContext } from 'react';
import { EventOption, StylingOption, ViewMode } from './types/public-types';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { removeHiddenTasks, sortTasks } from './helpers/other-helper';
import { ganttDateRange, isToday, seedDates } from './helpers/date-helper';
import { convertToBars, convertToNuggets, dateToProgress } from './helpers/bar-helper';
import { TaskGanttContent, TaskGanttContentProps } from './internal/TaskGanttContent';
// import { TaskList, TaskListProps } from './components/task-list/task-list';
import { GanttEvent } from './types/gantt-task-actions';
import { DispatchContext, StateContext } from './GanttStore';
import { TaskList, TaskListProps } from './plugins/TaskList/TaskList';
import { Grid } from './plugins/Grid/Grid';
import { Task, TaskBar } from './bars/types';
import { Calendar, CalendarProps } from './plugins/Calendar/Calendar';
import { StandardTooltipContent, Tooltip } from './internal/Tooltip';
import styled from 'styled-components';
import { GridProps } from './plugins/Grid';
import { debounce } from 'components/helpers';
import { GanttProps } from './Gantt';

const Wrapper = styled.div<{ width: number }>`
    overflow: hidden;
    display: grid;
    grid-template-columns: ${(props) => (props.width ? `${props.width}px 1fr` : 'auto 1fr')};
    padding: 0px;
    margin: 0px;
    list-style: none;
    outline: none;
    position: relative;
`;

export const VerticalContainer = styled.div`
    overflow-x: scroll;
    font-size: 0;
    margin: 0;
    padding: 0;
    display: grid;
`;

export const HorizontalContainer = styled.div<{ height: number; width: number }>`
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: ${(props: any) => (props.height ? `${props.height}px` : 'unset')};
    width: ${(props: any) => (props.width ? `${props.width}px` : 'unset')};
    position: relative;
`;

export type GanttDataProps = {
    tasks: Task[];
    grid?: any;
    taskList?: any;
    /**
     * Which way to split the calendar into ticks.
     * When changed, the grid and calendar redraw.
     */
    viewMode?: ViewMode;
    viewDate?: Date;
} & EventOption &
    GanttProps &
    StylingOption;

export const GanttData = forwardRef<any, GanttDataProps>((props: GanttDataProps, ref) => {
    const {
        grid,
        focus,
        listCellWidth = '155px',
        rowHeight = 50,
        ganttHeight = 0,
        barFill = 60,
        handleWidth = 8,
        timeStep = 300000,
        arrowColor = 'grey',
        arrowIndent = 20,
        viewDate,
        viewMode = ViewMode.Year,
        TooltipContent = StandardTooltipContent,
        onDateChange,
        onProgressChange,
        onDoubleClick,
        onClick,
        onDelete,
        onSelect,
        onSetTasks,
        onExpanderClick,
        taskList,
    } = props;

    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);

    /**
     * Container references
     */
    const wrapperRef = useRef<HTMLDivElement>(null);
    const taskListRef = useRef<HTMLDivElement>(null);
    const horizontalContainerRef = useRef<HTMLDivElement>(null);
    const verticalGanttContainerRef = useRef<HTMLDivElement>(null);

    /**
     * Initial state count
     */
    const init = useRef(0);

    const [currentViewDate, setCurrentViewDate] = useState<Date | undefined>(undefined);

    const [ganttEvent, setGanttEvent] = useState<GanttEvent>({
        action: '',
    });
    const taskHeight = useMemo(() => (rowHeight * barFill) / 100, [rowHeight, barFill]);

    const [selectedTask, setSelectedTask] = useState<TaskBar>();
    const [failedTask, setFailedTask] = useState<TaskBar | null>(null);

    const [bars, setBars] = useState<TaskBar[]>([]);
    const [nuggets, setNuggets] = useState<TaskBar[]>([]);

    const ganttFullHeight = bars.length * rowHeight;

    const [ignoreScrollEvent, setIgnoreScrollEvent] = useState(false);

    const svgWidth = state.ganttReducer.dates.length * state.gridReducer.tickWidth;

    /**
     * Removes hidden tasks and maps some props
     *
     * @param tasks
     * @returns Array<Task>
     */
    const filterTasks = (tasks: Array<Task>): Array<Task> => {
        let filteredTasks = onExpanderClick ? removeHiddenTasks(tasks) : tasks;
        filteredTasks = filteredTasks.sort(sortTasks);

        filteredTasks = filteredTasks.map((t: any) => {
            if (t.type && t.type[1] && t.type[1].sections && !t.type[1].sectionXPositions) {
                const sections = t.type[1].sections;
                const type = [...t.type];
                type[1].sectionXPositions = sections?.map((d: Date) => dateToProgress(d, [t.start, t.end])) || [];
                type[1].sections = sections;
                type[1].dates = [];

                return { ...t, type };
            }

            return t;
        });

        return filteredTasks;
    };

    const getTickWidth = (dates: Array<Date>) => {
        const defaultWidth = state.ganttReducer.viewModeTickWidth[viewMode.toLowerCase()];
        if (verticalGanttContainerRef.current) {
            const wrapperWidth = verticalGanttContainerRef.current.offsetWidth;
            const gridWidth = dates.length * defaultWidth;

            if (wrapperWidth > gridWidth) {
                return wrapperWidth / dates.length;
            }

            if (viewMode === ViewMode.Day && focus) {
                const tickCount = (new Date(focus[1]).getTime() - new Date(focus[0]).getTime()) / (1000 * 60 * 60 * 24);
                return wrapperWidth / tickCount;
            }
        }

        return defaultWidth;
    };

    const getTickIndex = (focusDate: Date, dates: Array<Date>): number => {
        return dates.findIndex(
            (date: any, i: any) =>
                focusDate.valueOf() >= date.valueOf() &&
                i + 1 !== dates.length &&
                focusDate.valueOf() < dates[i + 1].valueOf(),
        );
    };

    /**
     * Generate bars and dates and update state
     */
    useEffect(() => {
        if (props.tasks.length) {
            const filteredTasks = filterTasks(props.tasks);

            /** Main functions to draw grid and calendar */
            const [startDate, endDate] = ganttDateRange(filteredTasks, viewMode);
            const dates = seedDates(startDate, endDate, viewMode);

            /** Get column width from state. The width is determined by the current viewMode */
            const tickWidth = getTickWidth(dates);

            /** Generate bars and nuggets to be displayed */
            const bars = convertToBars(filteredTasks, dates, tickWidth, rowHeight, taskHeight, handleWidth);
            const nuggets = convertToNuggets(filteredTasks, dates, tickWidth, rowHeight, taskHeight, handleWidth);

            if (focus) {
                const index = getTickIndex(focus[0], dates);
                dispatch({ type: 'SET_SCROLL_X', payload: tickWidth * index });
            }

            dispatch({ type: 'SET_DATES', payload: dates });
            dispatch({ type: 'SET_TICK_WIDTH', payload: tickWidth });
            setBars(bars);
            setNuggets(nuggets);
        }
    }, [props.tasks, focus, viewMode, onExpanderClick]);

    /**
     * Will scroll to the date set in the viewDate
     */
    useEffect(() => {
        if ((viewDate && !currentViewDate) || (viewDate && currentViewDate?.valueOf() !== viewDate.valueOf())) {
            const dates = state.ganttReducer.dates;
            const index = dates.findIndex(
                (d: any, i: any) =>
                    viewDate.valueOf() >= d.valueOf() &&
                    i + 1 !== dates.length &&
                    viewDate.valueOf() < dates[i + 1].valueOf(),
            );
            if (index === -1) {
                return;
            }

            setCurrentViewDate(viewDate);
            const tickWidth = getTickWidth(dates);

            dispatch({ type: 'SET_SCROLL_X', payload: tickWidth * index });
        }
    }, [viewDate, state.ganttReducer.dates, viewMode, currentViewDate, setCurrentViewDate]);

    const recalculateBars = (changedTask: Task) => {
        const prevStateTask = bars.find((t: any) => t.id === changedTask.id);
        if (
            prevStateTask &&
            (prevStateTask.start.getTime() !== changedTask.start.getTime() ||
                prevStateTask.end.getTime() !== changedTask.end.getTime())
            // prevStateTask.progress !== changedTask.progress)
        ) {
            // actions for change
            const payload = bars.map((t: any) => (t.id === changedTask.id ? changedTask : t));
            setBars(payload);
        }
    };

    useEffect(() => {
        const { changedTask, action } = ganttEvent;

        if (changedTask) {
            if (action === 'delete') {
                setGanttEvent({ action: '' });

                const payload = bars.filter((t: any) => t.id !== changedTask.id);
                setBars(payload);
            } else if (action === 'move' || action === 'end' || action === 'start' || action === 'progress') {
                recalculateBars(changedTask);
            }
        }
    }, [ganttEvent, bars]);

    useEffect(() => {
        if (failedTask) {
            const payload = bars.map((t: any) => (t.id !== failedTask.id ? t : failedTask));
            setBars(payload);

            setFailedTask(null);
        }
    }, [failedTask, bars]);

    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            if (event.shiftKey || event.deltaX) {
                const scrollMove = event.deltaX ? event.deltaX : event.deltaY;
                let newScrollX = state.gridReducer.scrollX + scrollMove;
                if (newScrollX < 0) {
                    newScrollX = 0;
                } else if (newScrollX > svgWidth) {
                    newScrollX = svgWidth;
                }
                dispatch({ type: 'SET_SCROLL_X', payload: newScrollX });
                event.preventDefault();
            } else if (ganttHeight) {
                let newScrollY = scrollY + event.deltaY;
                if (newScrollY < 0) {
                    newScrollY = 0;
                } else if (newScrollY > ganttFullHeight - ganttHeight) {
                    newScrollY = ganttFullHeight - ganttHeight;
                }
                if (newScrollY !== state.gridReducer.scrollY) {
                    dispatch({ type: 'SET_SCROLL_Y', payload: newScrollY });
                    event.preventDefault();
                }
            }

            setIgnoreScrollEvent(true);
        };

        if (horizontalContainerRef.current) {
            horizontalContainerRef.current.scrollTop = state.gridReducer.scrollY;
        }

        if (verticalGanttContainerRef.current) {
            verticalGanttContainerRef.current.scrollLeft = state.gridReducer.scrollX;
        }

        // subscribe if scroll is necessary
        wrapperRef.current?.addEventListener('wheel', handleWheel, {
            passive: false,
        });
        return () => {
            wrapperRef.current?.removeEventListener('wheel', handleWheel);
        };
    }, [
        wrapperRef,
        state.gridReducer.scrollY,
        state.gridReducer.scrollX,
        ganttHeight,
        // state.gridReducer.svgWidth,
        ganttFullHeight,
    ]);

    /**
     * Set SVG width when dates or tickWidth updates
     */
    useEffect(() => {
        const tickWidth = state.gridReducer.tickWidth;
        // dispatch('SET_TICK_WIDTH', { payload: { tickWidth } });

        if (init.current < 5 && state.ganttReducer.dates && verticalGanttContainerRef.current) {
            for (let i = 0; i < state.ganttReducer.dates.length; i++) {
                if (isToday(state.ganttReducer.dates[i])) {
                    init.current++;
                    dispatch({
                        type: 'SET_SCROLL_X',
                        payload: (i - 1) * tickWidth,
                    });
                    verticalGanttContainerRef.current.scrollTo((i - 1) * tickWidth, 0);
                }
            }
        }
    }, [state.ganttReducer.dates, viewMode]);

    // const handleScrollY = (event: SyntheticEvent<HTMLDivElement>) => {
    //     if (scrollY !== event.currentTarget.scrollTop && !ignoreScrollEvent) {
    //         setScrollY(event.currentTarget.scrollTop);
    //         setIgnoreScrollEvent(true);
    //     } else {
    //         setIgnoreScrollEvent(false);
    //     }
    // };

    // const handleScrollX = (event: SyntheticEvent<HTMLDivElement>) => {
    //     if (scrollX !== event.currentTarget.scrollLeft && !ignoreScrollEvent) {
    //         setScrollX(event.currentTarget.scrollLeft);
    //         setIgnoreScrollEvent(true);
    //     } else {
    //         setIgnoreScrollEvent(false);
    //     }
    // };

    /**
     * Handles arrow keys events and transform it to new scroll
     */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        let newScrollY = state.gridReducer.scrollY;
        let newScrollX = state.gridReducer.scrollX;
        const dates = state.ganttReducer.dates;
        const tickWidth = getTickWidth(dates);
        let isX = true;
        switch (event.key) {
            case 'Down': // IE/Edge specific value
            case 'ArrowDown':
                newScrollY += rowHeight;
                isX = false;
                break;
            case 'Up': // IE/Edge specific value
            case 'ArrowUp':
                newScrollY -= rowHeight;
                isX = false;
                break;
            case 'Left':
            case 'ArrowLeft':
                newScrollX -= tickWidth;
                break;
            case 'Right': // IE/Edge specific value
            case 'ArrowRight':
                newScrollX += tickWidth;
                break;
        }
        if (isX) {
            if (newScrollX < 0) {
                newScrollX = 0;
            } else if (newScrollX > svgWidth) {
                newScrollX = svgWidth;
            }
            dispatch({ type: 'SET_SCROLL_X', payload: newScrollX });
        } else {
            if (newScrollY < 0) {
                newScrollY = 0;
            } else if (newScrollY > ganttFullHeight - ganttHeight) {
                newScrollY = ganttFullHeight - ganttHeight;
            }
            dispatch({ type: 'SET_SCROLL_Y', payload: newScrollY });
        }
        setIgnoreScrollEvent(true);
    };

    /**
     * Task select event
     */
    const handleSelectedTask = (taskId: string) => {
        const newSelectedTask = bars.find((t: any) => t.id === taskId);
        const oldSelectedTask = bars.find((t: any) => !!selectedTask && t.id === selectedTask.id);
        if (onSelect) {
            if (oldSelectedTask) {
                onSelect(oldSelectedTask, false);
            }
            if (newSelectedTask) {
                onSelect(newSelectedTask, true);
            }
        }
        if (newSelectedTask) setSelectedTask(newSelectedTask);
    };

    const handleTasks = (tasks: TaskBar[]) => {
        if (onSetTasks) {
            onSetTasks(tasks);
        }
    };

    const handleExpanderClick = (task: Task) => {
        if (onExpanderClick && task.hideChildren !== undefined) {
            onExpanderClick({ ...task, hideChildren: !task.hideChildren });
        }
    };

    const calendarProps: CalendarProps = {
        viewMode,
    };
    const barProps: TaskGanttContentProps = {
        bars,
        nuggets,
        viewMode,
        ganttEvent,
        selectedTask,
        rowHeight,
        taskHeight,
        arrowColor,
        timeStep,
        arrowIndent,
        setGanttEvent,
        setFailedTask,
        setBars: handleTasks,
        setSelectedTask: handleSelectedTask,
        onDateChange,
        onProgressChange,
        onDoubleClick,
        onClick,
        onDelete,
    };

    const tableProps: TaskListProps = {
        bars,
        rowHeight,
        rowWidth: listCellWidth,
        scrollY,
        ganttHeight,
        selectedTask,
        taskListRef,
        setSelectedTask: handleSelectedTask,
        onExpanderClick: handleExpanderClick,
    };

    if (!bars.length || !state.ganttReducer.dates.length) return <></>;

    return (
        <>
            <Wrapper
                id="gantt-wrapper"
                onKeyDown={handleKeyDown}
                tabIndex={0}
                ref={wrapperRef}
                width={taskList?.props?.width}
            >
                {taskList && listCellWidth && <TaskList {...tableProps} {...taskList.props} />}

                <VerticalContainer id="gantt-vertical-container" ref={verticalGanttContainerRef}>
                    <Calendar {...calendarProps} viewMode={viewMode} />

                    <HorizontalContainer
                        id="gantt-horizontal-container"
                        ref={horizontalContainerRef}
                        height={ganttHeight}
                        width={state.ganttReducer.dates.length * state.gridReducer.tickWidth}
                    >
                        {grid && (
                            <Grid
                                barCount={bars.length}
                                rowHeight={rowHeight}
                                viewMode={viewMode}
                                {...grid.props}
                                ref={grid.ref}
                            />
                        )}

                        <TaskGanttContent {...barProps} />
                    </HorizontalContainer>
                </VerticalContainer>
                {/* {ganttEvent.changedTask && (
                    <Tooltip
                        arrowIndent={arrowIndent}
                        rowHeight={rowHeight}
                        svgContainerHeight={svgContainerHeight}
                        svgContainerWidth={svgContainerWidth}
                        task={ganttEvent.changedTask}
                        taskListWidth={taskListWidth}
                        TooltipContent={TooltipContent}
                        svgWidth={state.gridReducer.svgWidth}
                    />
                )} */}
                {/* <VerticalScroll
                        ganttFullHeight={ganttFullHeight}
                        ganttHeight={ganttHeight}
                        headerHeight={headerHeight}
                        scroll={scrollY}
                        onScroll={handleScrollY}
                    /> */}
            </Wrapper>
            {/* <HorizontalScroll
                    svgWidth={svgWidth}
                    taskListWidth={taskListWidth}
                    scroll={scrollX}
                    onScroll={handleScrollX}
                /> */}
        </>
    );
});
