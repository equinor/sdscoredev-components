import { useContext } from 'react';
import { DisplayOption, EventOption, StylingOption, ViewMode } from './types/public-types';
import React, { useState, SyntheticEvent, useRef, useEffect, useMemo } from 'react';
import { removeHiddenTasks, sortTasks } from './helpers/other-helper';
import { ganttDateRange, seedDates } from './helpers/date-helper';
import { convertToBars } from './helpers/bar-helper';
import { TaskGanttContentProps } from './internal/TaskGanttContent';
// import { TaskList, TaskListProps } from './components/task-list/task-list';
import { Container } from './internal/Container';
import { GanttEvent } from './types/gantt-task-actions';
import { TaskListHeaderDefault } from './plugins/task-list/task-list-header';
import { TaskListTableDefault } from './plugins/task-list/task-list-table';
import { DispatchContext, StateContext } from './GanttStore';
import { TaskList, TaskListProps } from './plugins/task-list/task-list';
import { GridProps } from './plugins/Grid';
import { Task, TaskBar } from './bars/types';
import { CalendarProps } from './plugins/Calendar/Calendar';
import { StandardTooltipContent } from './internal/Tooltip';
import styled from 'styled-components';

const Wrapper = styled.div`
    overflow: hidden;
    display: grid;
    grid-template-columns: auto 1fr;
    padding: 0px;
    margin: 0px;
    list-style: none;
    outline: none;
    position: relative;
`;
export type GanttDataProps = {
    tasks: Task[];
    grid?: GridProps;
} & EventOption &
    DisplayOption &
    StylingOption;

export const GanttData = (props: GanttDataProps) => {
    const {
        grid,
        headerHeight = 50,
        columnWidth = 60,
        listCellWidth = '155px',
        rowHeight = 50,
        ganttHeight = 0,
        viewMode = ViewMode.Day,
        barFill = 60,
        handleWidth = 8,
        timeStep = 300000,
        arrowColor = 'grey',
        arrowIndent = 20,
        todayColor = 'rgba(252, 248, 227, 0.5)',
        viewDate,
        TooltipContent = StandardTooltipContent,
        TaskListHeader = TaskListHeaderDefault,
        TaskListTable = TaskListTableDefault,
        onDateChange,
        onProgressChange,
        onDoubleClick,
        onClick,
        onDelete,
        onSelect,
        onSetTasks,
        onExpanderClick,
    } = props;

    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const taskListRef = useRef<HTMLDivElement>(null);
    // const [dateSetup, setDateSetup] = useState<any>(() => {
    //     const [startDate, endDate] = ganttDateRange(tasks, viewMode);
    //     return { viewMode, dates: seedDates(startDate, endDate, viewMode) };
    // });
    const [currentViewDate, setCurrentViewDate] = useState<Date | undefined>(undefined);

    const [taskListWidth, setTaskListWidth] = useState(0);
    const [svgContainerWidth, setSvgContainerWidth] = useState(0);
    const [svgContainerHeight, setSvgContainerHeight] = useState(ganttHeight);
    const [ganttEvent, setGanttEvent] = useState<GanttEvent>({
        action: '',
    });
    const taskHeight = useMemo(() => (rowHeight * barFill) / 100, [rowHeight, barFill]);

    const [selectedTask, setSelectedTask] = useState<TaskBar>();
    const [failedTask, setFailedTask] = useState<TaskBar | null>(null);

    const [bars, setBars] = useState<TaskBar[]>([]);

    const ganttFullHeight = bars.length * rowHeight;

    const [scrollY, setScrollY] = useState(0);
    const [scrollX, setScrollX] = useState(-1);
    const [ignoreScrollEvent, setIgnoreScrollEvent] = useState(false);

    /**
     * Set SVG width when dates or columnWidth updates
     */
    useEffect(() => {
        dispatch({ type: 'SET_MEASURES', payload: { svgWidth: state.ganttReducer.dates.length * columnWidth } });
    }, [state.ganttReducer.dates, columnWidth]);

    /**
     * Generate bars and dates and update state
     */
    useEffect(() => {
        if (props.tasks.length) {
            let filteredTasks = onExpanderClick ? removeHiddenTasks(props.tasks) : props.tasks;
            filteredTasks = filteredTasks.sort(sortTasks);

            const [startDate, endDate] = ganttDateRange(filteredTasks, viewMode);

            const dates = seedDates(startDate, endDate, viewMode);
            const bars = convertToBars(filteredTasks, dates, columnWidth, rowHeight, taskHeight, handleWidth);

            dispatch({ type: 'SET_DATES', payload: dates });
            setBars(bars);
        }
    }, [props.tasks, viewMode, rowHeight, columnWidth, taskHeight, handleWidth, scrollX, onExpanderClick]);

    useEffect(() => {
        if (
            viewMode === viewMode &&
            ((viewDate && !currentViewDate) || (viewDate && currentViewDate?.valueOf() !== viewDate.valueOf()))
        ) {
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
            setScrollX(columnWidth * index);
        }
    }, [viewDate, columnWidth, state.ganttReducer.dates, viewMode, currentViewDate, setCurrentViewDate]);

    useEffect(() => {
        const { changedTask, action } = ganttEvent;
        if (changedTask) {
            if (action === 'delete') {
                setGanttEvent({ action: '' });

                const payload = bars.filter((t: any) => t.id !== changedTask.id);
                setBars(payload);
            } else if (action === 'move' || action === 'end' || action === 'start' || action === 'progress') {
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
        if (!listCellWidth) {
            setTaskListWidth(0);
        }
        if (taskListRef.current) {
            setTaskListWidth(taskListRef.current.offsetWidth);
        }
    }, [taskListRef, listCellWidth]);

    useEffect(() => {
        if (wrapperRef.current) {
            setSvgContainerWidth(wrapperRef.current.offsetWidth - taskListWidth);
        }
    }, [wrapperRef, taskListWidth]);

    useEffect(() => {
        if (ganttHeight) {
            setSvgContainerHeight(ganttHeight + headerHeight);
        } else {
            setSvgContainerHeight(bars.length * rowHeight + headerHeight);
        }
    }, [ganttHeight, bars, headerHeight, rowHeight]);

    // scroll events
    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            if (event.shiftKey || event.deltaX) {
                const scrollMove = event.deltaX ? event.deltaX : event.deltaY;
                let newScrollX = scrollX + scrollMove;
                if (newScrollX < 0) {
                    newScrollX = 0;
                } else if (newScrollX > state.gridReducer.svgWidth) {
                    newScrollX = state.gridReducer.svgWidth;
                }
                setScrollX(newScrollX);
                event.preventDefault();
            } else if (ganttHeight) {
                let newScrollY = scrollY + event.deltaY;
                if (newScrollY < 0) {
                    newScrollY = 0;
                } else if (newScrollY > ganttFullHeight - ganttHeight) {
                    newScrollY = ganttFullHeight - ganttHeight;
                }
                if (newScrollY !== scrollY) {
                    setScrollY(newScrollY);
                    event.preventDefault();
                }
            }

            setIgnoreScrollEvent(true);
        };

        // subscribe if scroll is necessary
        wrapperRef.current?.addEventListener('wheel', handleWheel, {
            passive: false,
        });
        return () => {
            wrapperRef.current?.removeEventListener('wheel', handleWheel);
        };
    }, [wrapperRef, scrollY, scrollX, ganttHeight, state.gridReducer.svgWidth, ganttFullHeight]);

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
        let newScrollY = scrollY;
        let newScrollX = scrollX;
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
                newScrollX -= columnWidth;
                break;
            case 'Right': // IE/Edge specific value
            case 'ArrowRight':
                newScrollX += columnWidth;
                break;
        }
        if (isX) {
            if (newScrollX < 0) {
                newScrollX = 0;
            } else if (newScrollX > state.gridReducer.svgWidth) {
                newScrollX = state.gridReducer.svgWidth;
            }
            setScrollX(newScrollX);
        } else {
            if (newScrollY < 0) {
                newScrollY = 0;
            } else if (newScrollY > ganttFullHeight - ganttHeight) {
                newScrollY = ganttFullHeight - ganttHeight;
            }
            setScrollY(newScrollY);
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
        headerHeight,
        columnWidth,
    };
    const barProps: TaskGanttContentProps = {
        bars,
        ganttEvent,
        selectedTask,
        rowHeight,
        taskHeight,
        columnWidth,
        arrowColor,
        timeStep,
        arrowIndent,
        svgWidth: state.gridReducer.svgWidth,
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
        headerHeight,
        scrollY,
        ganttHeight,
        selectedTask,
        taskListRef,
        setSelectedTask: handleSelectedTask,
        onExpanderClick: handleExpanderClick,
        TaskListHeader,
        TaskListTable,
    };

    useEffect(() => {}, [state.ganttReducer]);

    if (!bars.length || !state.ganttReducer.dates.length) return <></>;
    return (
        <>
            <Wrapper onKeyDown={handleKeyDown} tabIndex={0} ref={wrapperRef}>
                {listCellWidth && <TaskList {...tableProps} />}
                <Container
                    bars={bars}
                    calendarProps={calendarProps}
                    barProps={barProps}
                    ganttHeight={ganttHeight}
                    scrollY={scrollY}
                    scrollX={scrollX}
                />
                {/* {ganttEvent.changedTask && (
                        <Tooltip
                            arrowIndent={arrowIndent}
                            rowHeight={rowHeight}
                            svgContainerHeight={svgContainerHeight}
                            svgContainerWidth={svgContainerWidth}
                            scrollX={scrollX}
                            scrollY={scrollY}
                            task={ganttEvent.changedTask}
                            headerHeight={headerHeight}
                            taskListWidth={taskListWidth}
                            TooltipContent={TooltipContent}
                            svgWidth={svgWidth}
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
};
