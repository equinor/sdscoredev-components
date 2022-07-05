import { Task, TaskType } from './public-types';

export interface BarTask extends Task {
    index: number;
    typeInternal: TaskTypeInternal;
    x1: number;
    x2: number;
    y: number;
    height: number;
    progressX: number;
    progressWidth: number;
    handleWidth: number;
    barChildren: BarTask[];
}

export type TaskTypeInternal = TaskType | 'smalltask';
