import { MilestoneBar } from './MilestoneBar';
import { dateByX, moveByX, taskXCoordinate, taskYCoordinate } from 'components/Gantt/helpers/bar-helper';
import { BarTask } from 'components/Gantt/types/bar-task';
import { BarMoveAction } from 'components/Gantt/types/gantt-task-actions';
import { Task } from 'components/Gantt/types/public-types';

export const convert = (
    task: Task,
    index: number,
    dates: Date[],
    columnWidth: number,
    rowHeight: number,
    taskHeight: number,
    handleWidth: number,
): BarTask => {
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
        y,
        index,
        progressX: 0,
        progressWidth: 0,
        handleWidth,
        typeInternal: task.type,
        progress: 0,
        height: rotatedHeight,
        hideChildren: undefined,
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
