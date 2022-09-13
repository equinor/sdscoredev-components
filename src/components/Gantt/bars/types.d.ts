import React from 'react';

import { GanttContentMoveAction } from '../types/gantt-task-actions';

/**
 * This is the initial item, that describe the task.
 * This will be mapped into a `TaskBar` that contain technical properties aswell.
 */
export type Task<T = {}> = {
    /**
     * Unique id of the task.
     * This will need to be set so that other tasks can point to this task with the `dependencies` property.
     */
    id: string;
    /**
     * Definition for the type of bar this task will be displayed with.
     * Must be set, and most often the `DefaultBar` is to be prefered.
     */
    type: any; // [Bar<T>, T];
    /**
     * An extra bar item to be displayed in the row. Can be more or less anything
     */
    nuggets: any[];
    /**
     * Name for the action, will be displayed inside the bar. Temporarily not in use
     */
    name: string;
    /**
     * Start date for task
     */
    start: Date;
    /**
     * End date for task
     */
    end: Date;
    /**
     * Set to true to hide the task and it's bar
     */
    isDisabled?: boolean;
    /**
     * Not yet in use
     */
    project?: string;
    /**
     * This is where the connections are defined.
     * Add an id to this array to make this task dependent
     */
    dependencies?: string[];
    /**
     * Hides all dependencies or children
     */
    hideChildren?: boolean;
    /**
     * Order of task display.
     */
    displayOrder?: number;
};

/**
 * Describing the bar component
 */
export type Bar<T = {}> = {
    taskBar: TaskBar<T>;
    arrowIndent: number;
    taskHeight: number;
    isProgressChangeable: boolean;
    isDateChangeable: boolean;
    isDelete: boolean;
    isSelected: boolean;
    readonly?: boolean;
    onEventStart: (
        action: GanttContentMoveAction,
        selectedTask: TaskBar,
        event?: React.MouseEvent | React.KeyboardEvent,
    ) => any;
} & T;

export type NuggetProp = {
    taskBar: TaskBar;
    taskHeight: number;
    nugget: any;
};

/**
 * Props for creating the content of the bar
 */
export type DisplayProps<T = {}> = {
    x: number;
    y: number;
    width: number;
    height: number;
    isSelected: boolean;
    onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
} & T;

/**
 * The more "technical" bar, includes the `Task` and the optional custom bar props `T`
 */
export type TaskBar<T = {}> = {
    index: number;
    x1: number;
    x2: number;
    y: number;
    height: number;
    handleWidth: number;
    barChildren: TaskBar<T>[];
} & Task &
    T;

/**
 * Props for converting/mapping the `Task` to a `TaskBar`
 */
export type TaskConvertOptions = {
    index: number;
    dates: Date[];
    tickWidth: number;
    rowHeight: number;
    taskHeight: number;
    handleWidth: number;
};

/**
 * Mouse events for `TaskBar`
 */
export type TaskBarMouseEvent<T> = { isChanged: boolean; changedTask: TaskBar<T> };

// TODO: add real definition
export type BarProps = any;
