import { ProgressBar, ProgressBarProps } from './ProgressBar';
import {
    dateByX,
    endByX,
    moveByX,
    progressByX,
    progressWithByParams,
    startByX,
    taskXCoordinate,
    taskYCoordinate,
} from 'components/Gantt/helpers/bar-helper';
import { BarMoveAction } from 'components/Gantt/types/gantt-task-actions';
import { Task, TaskBar, TaskBarMouseEvent, TaskConvertOptions } from '../types';

export type ProgressTaskBar = {
    /**
     * x position of progress
     */
    progressX: number;
    /**
     * width of progress
     */
    progressWidth: number;
} & ProgressBarProps;

/**
 * Maps a `Task` into a `TaskBar`
 */
export const convert = (task: Task<ProgressBarProps>, options: TaskConvertOptions): TaskBar<ProgressTaskBar> => {
    const { index = 0, dates, columnWidth, rowHeight, taskHeight, handleWidth } = options;
    const { progress } = task.type[1];

    let x1 = taskXCoordinate(task.start, dates, columnWidth);
    let x2 = taskXCoordinate(task.end, dates, columnWidth);
    let y = taskYCoordinate(index, rowHeight, taskHeight);

    return {
        ...task,
        x1,
        x2,
        sx1: 0,
        sx2: 0,
        y,
        index,
        handleWidth,
        height: taskHeight,
        barChildren: [],
        ...progressWithByParams(x1, x2, progress || 0),
        progress,
    };
};

const handleMouseEvents = (
    svgX: number,
    action: BarMoveAction,
    selectedTask: TaskBar<ProgressTaskBar>,
    xStep: number,
    timeStep: number,
    initEventX1Delta: number,
): TaskBarMouseEvent<ProgressTaskBar> => {
    let changedTask = { ...selectedTask };

    let isChanged = false;

    switch (action) {
        case 'progress':
            changedTask.progress = progressByX(svgX, selectedTask);

            isChanged = changedTask.progress !== selectedTask.progress;
            if (isChanged) {
                changedTask = {
                    ...changedTask,
                    ...progressWithByParams(changedTask.x1, changedTask.x2, changedTask.progress),
                };
            }
            break;
        case 'start': {
            const newX1 = startByX(svgX, xStep, selectedTask);
            changedTask.x1 = newX1;
            isChanged = changedTask.x1 !== selectedTask.x1;
            if (isChanged) {
                changedTask.start = dateByX(newX1, selectedTask.x1, selectedTask.start, xStep, timeStep);
                changedTask = {
                    ...changedTask,
                    ...progressWithByParams(changedTask.x1, changedTask.x2, changedTask.progress || 0),
                };
            }
            break;
        }
        case 'end': {
            const newX2 = endByX(svgX, xStep, selectedTask);
            changedTask.x2 = newX2;
            isChanged = changedTask.x2 !== selectedTask.x2;
            if (isChanged) {
                changedTask.end = dateByX(newX2, selectedTask.x2, selectedTask.end, xStep, timeStep);
                changedTask = {
                    ...changedTask,
                    ...progressWithByParams(changedTask.x1, changedTask.x2, changedTask.progress || 0),
                };
            }
            break;
        }
        case 'move': {
            const [newMoveX1, newMoveX2] = moveByX(svgX - initEventX1Delta, xStep, selectedTask);
            isChanged = newMoveX1 !== selectedTask.x1;
            if (isChanged) {
                changedTask.start = dateByX(newMoveX1, selectedTask.x1, selectedTask.start, xStep, timeStep);
                changedTask.end = dateByX(newMoveX2, selectedTask.x2, selectedTask.end, xStep, timeStep);
                changedTask.x1 = newMoveX1;
                changedTask.x2 = newMoveX2;
                changedTask = {
                    ...changedTask,
                    ...progressWithByParams(changedTask.x1, changedTask.x2, changedTask.progress || 0),
                };
            }
            break;
        }
    }
    return { isChanged, changedTask };
};

// @ts-ignore
ProgressBar.convert = convert;
// @ts-ignore
ProgressBar.handleMouseEvents = handleMouseEvents;

export { ProgressBar };
