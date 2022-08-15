import { MilestoneBar, MilestoneBarProps } from './MilestoneBar';
import { dateByX, moveByX, taskXCoordinate, taskYCoordinate } from 'components/Gantt/helpers/bar-helper';
import { BarMoveAction } from 'components/Gantt/types/gantt-task-actions';
import { Task, TaskBar, TaskConvertOptions } from '../types';

export type MilestoneTaskBar = {} & MilestoneBarProps;

export const convert = (task: Task<MilestoneBarProps>, options: TaskConvertOptions): TaskBar => {
    const { index = 0, dates, columnWidth, rowHeight, taskHeight, handleWidth } = options;
    const x = taskXCoordinate(task.start, dates, columnWidth);
    const y = taskYCoordinate(index, rowHeight, taskHeight);

    const x1 = x - taskHeight * 0.5;
    const x2 = x + taskHeight * 0.5;

    const rotatedHeight = taskHeight / 1.414;
    return {
        ...task,
        end: task.start,
        x1,
        x2,
        sx1: 0,
        sx2: 0,
        y,
        index,
        handleWidth,
        height: rotatedHeight,
        hideChildren: undefined,
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
        case 'move': {
            const [newMoveX1, newMoveX2] = moveByX(svgX - initEventX1Delta, xStep, selectedTask);
            isChanged = newMoveX1 !== selectedTask.x1;
            if (isChanged) {
                changedTask.start = dateByX(newMoveX1, selectedTask.x1, selectedTask.start, xStep, timeStep);
                changedTask.end = changedTask.start;
                changedTask.x1 = newMoveX1;
                changedTask.x2 = newMoveX2;
            }
            break;
        }
    }
    return { isChanged, changedTask };
};

// @ts-ignore
MilestoneBar.convert = convert;
// @ts-ignore
MilestoneBar.handleMouseEvents = handleMouseEvents;

export { MilestoneBar };
