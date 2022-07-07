import React, { useContext, useEffect, useState } from 'react';
import { EventOption } from '../types/public-types';
import { Arrow } from './Arrow';
import { handleTaskBySVGMouseEvent } from '../helpers/bar-helper';
import { isKeyboardEvent } from '../helpers/other-helper';
import { InternalBar } from './Bar';
import { BarMoveAction, GanttContentMoveAction, GanttEvent } from '../types/gantt-task-actions';
import { DispatchContext, StateContext } from 'components/Gantt/GanttStore';
import { TaskBar } from '../bars/types';

export type TaskGanttContentProps = {
    bars: TaskBar[];
    ganttEvent: GanttEvent;
    selectedTask: TaskBar | undefined;
    rowHeight: number;
    columnWidth: number;
    timeStep: number;
    svg?: React.RefObject<SVGSVGElement>;
    svgWidth: number;
    taskHeight: number;
    arrowColor: string;
    arrowIndent: number;
    setGanttEvent: (value: GanttEvent) => void;
    setFailedTask: (value: TaskBar | null) => void;
    setSelectedTask: (taskId: string) => void;
    setBars: (tasks: TaskBar[]) => void;
} & EventOption;

export const TaskGanttContent: React.FC<TaskGanttContentProps> = ({
    bars,
    ganttEvent,
    selectedTask,
    rowHeight,
    columnWidth,
    timeStep,
    svg,
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
}) => {
    const point = svg?.current?.createSVGPoint();
    const [xStep, setXStep] = useState(0);
    const [initEventX1Delta, setInitEventX1Delta] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);

    // create xStep
    useEffect(() => {
        const dateDelta =
            state.ganttReducer.dates[1].getTime() -
            state.ganttReducer.dates[0].getTime() -
            state.ganttReducer.dates[1].getTimezoneOffset() * 60 * 1000 +
            state.ganttReducer.dates[0].getTimezoneOffset() * 60 * 1000;
        const newXStep = (timeStep * columnWidth) / dateDelta;
        setXStep(newXStep);
    }, [columnWidth, state.ganttReducer?.dates, timeStep]);

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
            svg.current.addEventListener('mouseup', handleMouseUp);
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
                        console.error('Error on Delete. ' + error);
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
            !!onDoubleClick && onDoubleClick(task);
        } else if (action === 'click') {
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

    return (
        <g className="content">
            <g className="arrows" fill={arrowColor} stroke={arrowColor}>
                {bars.map((task: TaskBar) => {
                    return task.barChildren.map((child: TaskBar) => {
                        return (
                            <Arrow
                                key={`Arrow from ${task.id} to ${bars[child.index].id}`}
                                taskFrom={task}
                                taskTo={bars[child.index]}
                                rowHeight={rowHeight}
                                taskHeight={taskHeight}
                                arrowIndent={arrowIndent}
                            />
                        );
                    });
                })}
            </g>
            <g className="bar">
                {bars.map((task: TaskBar) => {
                    return (
                        <InternalBar
                            taskBar={task}
                            arrowIndent={arrowIndent}
                            taskHeight={taskHeight}
                            isProgressChangeable={!!onProgressChange && !task.isDisabled}
                            isDateChangeable={!task.isDisabled}
                            isDelete={!task.isDisabled}
                            onEventStart={handleBarEventStart}
                            key={task.id}
                            isSelected={!!selectedTask && task.id === selectedTask.id}
                        />
                    );
                })}
            </g>
        </g>
    );
};
