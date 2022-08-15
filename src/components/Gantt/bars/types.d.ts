import React from 'react';

import { GanttContentMoveAction } from '../types/gantt-task-actions';

/**
 * This is the initial item, that describe the task.
 * This will be mapped into a `TaskBar` that contain technical properties aswell.
 */
export type Task<T = {}> = {
    id: string;
    type: any; // [Bar<T>, T];
    name: string;
    start: Date;
    end: Date;
    isDisabled?: boolean;
    project?: string;
    dependencies?: string[];
    hideChildren?: boolean;
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
    onEventStart: (
        action: GanttContentMoveAction,
        selectedTask: TaskBar,
        event?: React.MouseEvent | React.KeyboardEvent,
    ) => any;
} & T;

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
    sx1: number;
    sx2: number;
    y: number;
    height: number;
    handleWidth: number;
    barChildren: TaskBar<T>[];
    timeStep?: number;
    xStep?: number;
} & Task &
    T;

/**
 * Props for converting/mapping the `Task` to a `TaskBar`
 */
export type TaskConvertOptions = {
    index: number;
    dates: Date[];
    columnWidth: number;
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
