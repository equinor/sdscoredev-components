import { MultiSectionBar, MultiSectionBarProps } from './MultiSectionBar';
import { taskXCoordinate, taskYCoordinate } from 'components/Gantt/helpers/bar-helper';
import { dateByX, endByX, moveByX, startByX } from 'components/Gantt/helpers/bar-helper';
import { BarMoveAction } from 'components/Gantt/types/gantt-task-actions';
import { Task, TaskBar, TaskConvertOptions } from '../types';

export type MultiSectionTaskBar = {
    /**
     * Array of mapped dates to x-position
     */
    sectionXPositions: number[];
} & MultiSectionBarProps;

export const convert = (task: Task<MultiSectionBarProps>, options: TaskConvertOptions): TaskBar => {
    const { index = 0, dates, columnWidth, rowHeight, taskHeight, handleWidth } = options;
    const { sections } = task.type[1];

    let x1 = taskXCoordinate(task.start, dates, columnWidth);
    let x2 = taskXCoordinate(task.end, dates, columnWidth);

    const y = taskYCoordinate(index, rowHeight, taskHeight);
    return {
        ...task,
        x1,
        x2,
        y,
        index,
        handleWidth,
        height: taskHeight,
        barChildren: [],
    };
};

const handleMouseEvents = (
    svgX: number,
    action: BarMoveAction,
    selectedTask: TaskBar,
    xStep: number,
    timeStep: number,
    initEventX1Delta: number,
): { isChanged: boolean; changedTask: TaskBar } => {
    const changedTask: TaskBar = { ...selectedTask };
    let isChanged = false;
    switch (action) {
        case 'start': {
            const newX1 = startByX(svgX, xStep, selectedTask);
            changedTask.x1 = newX1;
            isChanged = changedTask.x1 !== selectedTask.x1;
            if (isChanged) {
                changedTask.start = dateByX(newX1, selectedTask.x1, selectedTask.start, xStep, timeStep);
            }
            break;
        }
        case 'end': {
            const newX2 = endByX(svgX, xStep, selectedTask);
            changedTask.x2 = newX2;
            isChanged = changedTask.x2 !== selectedTask.x2;
            if (isChanged) {
                changedTask.end = dateByX(newX2, selectedTask.x2, selectedTask.end, xStep, timeStep);
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
