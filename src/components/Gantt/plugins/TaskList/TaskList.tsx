import { Task, TaskBar } from 'components/Gantt/bars/types';
import React, { useEffect, useRef } from 'react';
import { TaskListHeader } from './TaskListHeader';
import { TaskListTable } from './TaskListTable';

export type TaskListProps = {
    bars: TaskBar[];
    rowWidth: string;
    rowHeight: number;
    ganttHeight: number;
    scrollY: number;
    render?: Function;
    taskListRef: React.RefObject<HTMLDivElement>;
    horizontalContainerClass?: string;
    selectedTask: TaskBar | undefined;
    setSelectedTask: (task: string) => void;
    onExpanderClick: (task: Task) => void;
};

export const TaskList: React.FC<TaskListProps> = (props) => {
    const {
        bars,
        rowWidth,
        rowHeight,
        scrollY,
        selectedTask,
        setSelectedTask,
        onExpanderClick,
        ganttHeight,
        taskListRef,
        horizontalContainerClass,
        render,
    } = props;
    const horizontalContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (horizontalContainerRef.current) {
            horizontalContainerRef.current.scrollTop = scrollY;
        }
    }, [scrollY]);

    const headerProps = {
        rowWidth,
    };
    const selectedTaskId = selectedTask ? selectedTask.id : '';
    const tableProps = {
        bars,
        rowHeight,
        rowWidth,
        selectedTaskId: selectedTaskId,
        setSelectedTask,
        onExpanderClick,
        render,
    };

    return (
        <div ref={taskListRef}>
            <TaskListHeader {...headerProps} />
            <div
                ref={horizontalContainerRef}
                className={horizontalContainerClass}
                style={ganttHeight ? { height: ganttHeight } : {}}
            >
                <TaskListTable {...tableProps} />
            </div>
        </div>
    );
};
