import React from 'react';
import { Task } from '../bars/types';

export const LOCALE = 'no-NO';

export enum ViewMode {
    Hour = 'Hour',
    QuarterDay = 'Quarter Day',
    HalfDay = 'Half Day',
    Day = 'Day',
    Week = 'Week',
    Month = 'Month',
    QuarterYear = 'QuarterYear',
    HalfYear = 'HalfYear',
    Year = 'Year',
}
export type TaskType = 'task' | 'milestone' | 'project' | 'action';

export type EventOption = {
    /**
     * Time step value for date changes.
     */
    timeStep?: number;
    /**
     * Invokes on bar select on unselect.
     */
    onSelect?: (task: Task, isSelected: boolean) => void;
    /**
     * Invokes on bar double click.
     */
    onDoubleClick?: (task: Task) => void;
    /**
     * Invokes on bar click.
     */
    onClick?: (task: Task) => void;
    /**
     * Invokes on end and start time change. Chart undoes operation if method return false or error.
     */
    onDateChange?: (task: Task, children: Task[]) => void | boolean | Promise<void> | Promise<boolean>;
    /**
     * Invokes on progress change. Chart undoes operation if method return false or error.
     */
    onProgressChange?: (task: Task, children: Task[]) => void | boolean | Promise<void> | Promise<boolean>;
    /**
     * Invokes on delete selected task. Chart undoes operation if method return false or error.
     */
    onDelete?: (task: Task) => void | boolean | Promise<void> | Promise<boolean>;
    /**
     * Invokes on expander on task list
     */
    onExpanderClick?: (task: Task) => void;

    onSetTasks?: (tasks: Task[]) => void;
};

export type StylingOption = {
    headerHeight?: number;
    tickWidth?: number;
    listCellWidth?: string;
    rowHeight?: number;
    ganttHeight?: number;
    barCornerRadius?: number;
    handleWidth?: number;
    fontFamily?: string;
    fontSize?: string;
    /**
     * How many of row width can be taken by task.
     * From 0 to 100
     */
    barFill?: number;
    barProgressColor?: string;
    barProgressSelectedColor?: string;
    barBackgroundColor?: string;
    barBackgroundSelectedColor?: string;
    projectProgressColor?: string;
    projectProgressSelectedColor?: string;
    projectBackgroundColor?: string;
    projectBackgroundSelectedColor?: string;
    milestoneBackgroundColor?: string;
    milestoneBackgroundSelectedColor?: string;
    arrowColor?: string;
    arrowIndent?: number;
    todayColor?: string;
    TooltipContent?: React.FC<{
        task: Task;
        fontSize: string;
        fontFamily: string;
    }>;
    TaskListHeader?: React.FC<{
        headerHeight: number;
        rowWidth: string;
        fontFamily: string;
        fontSize: string;
    }>;
    TaskListTable?: React.FC<{
        rowHeight: number;
        rowWidth: string;
        fontFamily: string;
        fontSize: string;
        locale: string;
        tasks: Task[];
        selectedTaskId: string;
        /**
         * Sets selected task by id
         */
        setSelectedTask: (taskId: string) => void;
        onExpanderClick: (task: Task) => void;
    }>;
};
