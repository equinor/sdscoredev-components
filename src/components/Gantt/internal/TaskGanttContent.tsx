import React, { useContext, useEffect, useRef, useState } from 'react';
import { ViewMode } from 'types';
import { StateContext } from '../GanttStore';
import { Arrow } from './Arrow';
import { handleTaskBySVGMouseEvent } from '../helpers/bar-helper';
import { isKeyboardEvent } from '../helpers/other-helper';
import { InternalBar } from './Bar';
import { BarMoveAction, GanttContentMoveAction, GanttEvent } from '../types/gantt-task-actions';
import { TaskBar } from '../bars/types';
import { Nugget } from './Nugget';
import { EventOption } from '../types/public-types';

export type TaskGanttContentProps = {
    bars: TaskBar[];
    viewMode: ViewMode;
    nuggets: TaskBar[];
    ganttEvent: GanttEvent;
    selectedTask: TaskBar | undefined;
    rowHeight: number;
    timeStep: number;
    taskHeight: number;
    arrowColor: string;
    arrowIndent: number;
    setGanttEvent: (value: GanttEvent) => void;
    setFailedTask: (value: TaskBar | null) => void;
    setSelectedTask: (taskId: string) => void;
    setBars: (tasks: TaskBar[]) => void;
    readonly?: boolean;
} & EventOption;

export const TaskGanttContent: React.FC<TaskGanttContentProps> = ({
    bars,
    viewMode,
    nuggets,
    ganttEvent,
    selectedTask,
    rowHeight,
    timeStep,
    taskHeight,
    arrowColor,
    arrowIndent,
    setGanttEvent,
    setFailedTask,
    setSelectedTask,
    setBars,
    onDateChange,
    onProgressChange,
    onDoubleClick,
    onClick,
    onDelete,
    readonly,
}) => {
    const [xStep, setXStep] = useState(0);
    const [initEventX1Delta, setInitEventX1Delta] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const state: any = useContext(StateContext);
    const ganttSVGRef = useRef<SVGSVGElement>(null);
    const svg: React.RefObject<SVGSVGElement> = ganttSVGRef;
    let point = svg?.current?.createSVGPoint();

    useEffect(() => {
        point = svg?.current?.createSVGPoint();
    }, [svg.current]);

    // create xStep
    useEffect(() => {
        const { tickWidth } = state.gridReducer;
        const dateDelta =
            state.ganttReducer.dates[1].getTime() -
            state.ganttReducer.dates[0].getTime() -
            state.ganttReducer.dates[1].getTimezoneOffset() * 60 * 1000 +
            state.ganttReducer.dates[0].getTimezoneOffset() * 60 * 1000;
        const newXStep = (timeStep * tickWidth) / dateDelta;
        setXStep(newXStep);
    }, [viewMode, state.ganttReducer?.dates, timeStep]);

    /**
     * Internal dateChange event handler
     *
     * @param task
     * @param children
     * @returns
     */
    const handleDateChange = async (task: TaskBar, children: TaskBar[]) => {
        let operationSuccess = true;
        if (onDateChange) {
            try {
                const result = await onDateChange(task, children);
                if (result !== undefined) {
                    operationSuccess = result;
                }
            } catch (error) {
                operationSuccess = false;
            }
        }

        if (operationSuccess) {
            const payload = bars.map((t: any) => (t.id === task.id ? task : t));
            setBars(payload);
        }

        return operationSuccess;
    };

    useEffect(() => {
        const handleMouseMove = async (event: MouseEvent) => {
            if (!ganttEvent.changedTask || !point || !svg?.current) return;
            event.preventDefault();

            point.x = event.clientX;
            const cursor = point.matrixTransform(svg?.current.getScreenCTM()?.inverse());

            const { isChanged, changedTask } = handleTaskBySVGMouseEvent(
                cursor.x,
                ganttEvent.action as BarMoveAction,
                ganttEvent.changedTask,
                xStep,
                timeStep,
                initEventX1Delta,
            );
            if (isChanged) {
                setGanttEvent({ action: ganttEvent.action, changedTask });
            }
        };

        const handleMouseUp = async (event: MouseEvent) => {
            const { action, originalSelectedTask, changedTask } = ganttEvent;
            if (!changedTask || !point || !svg?.current || !originalSelectedTask) return;
            event.preventDefault();

            point.x = event.clientX;
            const cursor = point.matrixTransform(svg?.current.getScreenCTM()?.inverse());
            const { changedTask: newChangedTask } = handleTaskBySVGMouseEvent(
                cursor.x,
                action as BarMoveAction,
                changedTask,
                xStep,
                timeStep,
                initEventX1Delta,
            );

            const isNotLikeOriginal =
                originalSelectedTask.start !== newChangedTask.start || originalSelectedTask.end !== newChangedTask.end;
            // originalSelectedTask.progress !== newChangedTask.progress;

            // remove listeners
            svg.current.removeEventListener('mousemove', handleMouseMove);
            svg.current.removeEventListener('mouseup', handleMouseUp);
            setGanttEvent({ action: '' });
            setIsMoving(false);

            // custom operation start
            let operationSuccess = true;
            if ((action === 'move' || action === 'end' || action === 'start') && isNotLikeOriginal) {
                operationSuccess = await handleDateChange(newChangedTask, newChangedTask.barChildren);
            } else if (onProgressChange && isNotLikeOriginal) {
                try {
                    const result = await onProgressChange(newChangedTask, newChangedTask.barChildren);
                    if (result !== undefined) {
                        operationSuccess = result;
                    }
                } catch (error) {
                    operationSuccess = false;
                }
            }

            // If operation is failed - return old state
            if (!operationSuccess) {
                setFailedTask(originalSelectedTask);
            }
        };

        if (
            !isMoving &&
            (ganttEvent.action === 'move' ||
                ganttEvent.action === 'end' ||
                ganttEvent.action === 'start' ||
                ganttEvent.action === 'progress') &&
            svg?.current
        ) {
            svg.current.addEventListener('mousemove', handleMouseMove);
            if (!readonly) svg.current.addEventListener('mouseup', handleMouseUp);
            setIsMoving(true);
        }
    }, [
        ganttEvent,
        xStep,
        initEventX1Delta,
        onProgressChange,
        timeStep,
        onDateChange,
        svg,
        isMoving,
        point,
        setFailedTask,
        setGanttEvent,
        readonly,
    ]);

    /**
     * Method is Start point of task change
     */
    const handleBarEventStart = async (
        action: GanttContentMoveAction,
        task: TaskBar,
        event?: React.MouseEvent | React.KeyboardEvent,
    ) => {
        if (!event) {
            if (action === 'select') {
                setSelectedTask(task.id);
            }
        }
        // Keyboard events
        else if (isKeyboardEvent(event)) {
            if (action === 'delete') {
                if (onDelete) {
                    try {
                        const result = await onDelete(task);
                        if (result !== undefined && result) {
                            setGanttEvent({ action, changedTask: task });
                        }
                    } catch (error) {
                        console.error(`Error on Delete. ${error}`);
                    }
                }
            }
        }
        // Mouse Events
        else if (action === 'mouseenter') {
            if (!ganttEvent.action) {
                setGanttEvent({
                    action,
                    changedTask: task,
                    originalSelectedTask: task,
                });
            }
        } else if (action === 'mouseleave') {
            if (ganttEvent.action === 'mouseenter') {
                setGanttEvent({ action: '' });
            }
        } else if (action === 'dblclick') {
            // eslint-disable-next-line no-unused-expressions
            !!onDoubleClick && onDoubleClick(task);
        } else if (action === 'click') {
            // eslint-disable-next-line no-unused-expressions
            !!onClick && onClick(task);
        }
        // Change task event start
        else if (action === 'move') {
            if (!svg?.current || !point) return;
            point.x = event.clientX;
            const cursor = point.matrixTransform(svg.current.getScreenCTM()?.inverse());
            setInitEventX1Delta(cursor.x - task.x1);
            setGanttEvent({
                action,
                changedTask: task,
                originalSelectedTask: task,
            });
        } else {
            setGanttEvent({
                action,
                changedTask: task,
                originalSelectedTask: task,
            });
        }
    };

    const merged = [...bars, ...nuggets].sort((a: any, b: any) => {
        const first = a.nugget ? a.nugget[1].pri : a.type[1].pri;
        const second = b.nugget ? b.nugget[1].pri : b.type[1].pri;

        if (first > second) {
            return -1;
        }
        if (first < second) {
            return 1;
        }
        return 0;
    });

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={state.ganttReducer.dates.length * state.gridReducer.tickWidth}
            height={rowHeight * bars.length}
            ref={ganttSVGRef}
            style={{
                fontFamily: 'Equinor',
                fontSize: '12px',
                zIndex: 99,
                position: 'absolute',
                top: 0,
                left: 0,
            }}
        >
            <g className="gantt-content">
                <g className="arrows" fill={arrowColor} stroke={arrowColor}>
                    {bars.map((task: TaskBar) => (
                        <React.Fragment key={`arrow-group-${task.id}`}>
                            {task.barChildren.map((child: TaskBar) => (
                                <Arrow
                                    key={`Arrow from ${task.id} to ${bars[child.index].id}`}
                                    taskFrom={task}
                                    taskTo={bars[child.index]}
                                    rowHeight={rowHeight}
                                    taskHeight={taskHeight}
                                    arrowIndent={arrowIndent}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </g>
                <g className="nuggets">
                    {merged.map((item: any) => {
                        if (item.nugget)
                            return (
                                <Nugget
                                    key={item.nugget[1].id}
                                    taskBar={item}
                                    nugget={item.nugget}
                                    taskHeight={taskHeight}
                                />
                            );
                        if (!item.nugget && item.type)
                            return (
                                <InternalBar
                                    taskBar={item}
                                    arrowIndent={arrowIndent}
                                    taskHeight={taskHeight}
                                    isProgressChangeable={!!onProgressChange && !item.isDisabled}
                                    isDateChangeable={!item.isDisabled}
                                    isDelete={!item.isDisabled}
                                    onEventStart={handleBarEventStart}
                                    key={item.id}
                                    isSelected={!!selectedTask && item.id === selectedTask.id}
                                    readonly={readonly}
                                />
                            );
                        return <></>;
                    })}
                </g>
            </g>
        </svg>
    );
};
