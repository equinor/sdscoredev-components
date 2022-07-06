import { MultiSectionBar } from './MultiSectionBar';
import { progressWithByParams, taskXCoordinate, taskYCoordinate } from 'components/Gantt/helpers/bar-helper';
import { dateByX, endByX, moveByX, progressByX, startByX } from 'components/Gantt/helpers/bar-helper';
import { BarTask, TaskTypeInternal } from 'components/Gantt/types/bar-task';
import { Task } from 'components/Gantt/types/public-types';
import { BarMoveAction } from 'components/Gantt/types/gantt-task-actions';

export const convert = (
    task: Task,
    index: number,
    dates: Date[],
    columnWidth: number,
    rowHeight: number,
    taskHeight: number,
    handleWidth: number,
): BarTask => {
    let x1: number;
    let x2: number;

    x1 = taskXCoordinate(task.start, dates, columnWidth);
    x2 = taskXCoordinate(task.end, dates, columnWidth);

    let typeInternal: TaskTypeInternal = task.type;
    if (typeInternal === 'task' && x2 - x1 < handleWidth * 2) {
        typeInternal = 'smalltask';
        x2 = x1 + handleWidth * 2;
    }

    const [progressWidth, progressX] = progressWithByParams(x1, x2, task.progress);
    const y = taskYCoordinate(index, rowHeight, taskHeight);
    const hideChildren = task.type === 'project' ? task.hideChildren : undefined;

    return {
        ...task,
        typeInternal,
        x1,
        x2,
        y,
        index,
        progressX,
        progressWidth,
        handleWidth,
        hideChildren,
        height: taskHeight,
        barChildren: [],
    };
};

const handleMouseEvents = (
    svgX: number,
    action: BarMoveAction,
    selectedTask: BarTask,
    xStep: number,
    timeStep: number,
    initEventX1Delta: number,
): { isChanged: boolean; changedTask: BarTask } => {
    const changedTask: BarTask = { ...selectedTask };
    let isChanged = false;
    switch (action) {
        case 'progress':
            changedTask.progress = progressByX(svgX, selectedTask);

            isChanged = changedTask.progress !== selectedTask.progress;
            if (isChanged) {
                const [progressWidth, progressX] = progressWithByParams(
                    changedTask.x1,
                    changedTask.x2,
                    changedTask.progress,
                );
                changedTask.progressWidth = progressWidth;
                changedTask.progressX = progressX;
            }
            break;
        case 'start': {
            const newX1 = startByX(svgX, xStep, selectedTask);
            changedTask.x1 = newX1;
            isChanged = changedTask.x1 !== selectedTask.x1;
            if (isChanged) {
                changedTask.start = dateByX(newX1, selectedTask.x1, selectedTask.start, xStep, timeStep);

                const [progressWidth, progressX] = progressWithByParams(
                    changedTask.x1,
                    changedTask.x2,
                    changedTask.progress,
                );
                changedTask.progressWidth = progressWidth;
                changedTask.progressX = progressX;
            }
            break;
        }
        case 'end': {
            const newX2 = endByX(svgX, xStep, selectedTask);
            changedTask.x2 = newX2;
            isChanged = changedTask.x2 !== selectedTask.x2;
            if (isChanged) {
                changedTask.end = dateByX(newX2, selectedTask.x2, selectedTask.end, xStep, timeStep);

                const [progressWidth, progressX] = progressWithByParams(
                    changedTask.x1,
                    changedTask.x2,
                    changedTask.progress,
                );
                changedTask.progressWidth = progressWidth;
                changedTask.progressX = progressX;
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
                const [progressWidth, progressX] = progressWithByParams(
                    changedTask.x1,
                    changedTask.x2,
                    changedTask.progress,
                );
                changedTask.progressWidth = progressWidth;
                changedTask.progressX = progressX;
            }
            break;
        }
    }
    return { isChanged, changedTask };
};

// @ts-ignore
MultiSectionBar.convert = convert;
// @ts-ignore
MultiSectionBar.handleMouseEvents = handleMouseEvents;

export { MultiSectionBar };
