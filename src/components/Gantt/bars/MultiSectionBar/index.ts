import { MultiSectionBar, MultiSectionBarProps } from './MultiSectionBar';
import { dateByPercents, dateToProgress, taskXCoordinate, taskYCoordinate } from 'components/Gantt/helpers/bar-helper';
import { dateByX, endByX, moveByX, startByX } from 'components/Gantt/helpers/bar-helper';
import { BarMoveAction } from 'components/Gantt/types/gantt-task-actions';
import { Task, TaskBar, TaskConvertOptions } from '../types';

export type MultiSectionTaskBar = {} & MultiSectionBarProps;

export const convert = (
    task: Task<MultiSectionBarProps>,
    options: TaskConvertOptions,
): TaskBar<MultiSectionTaskBar> => {
    const { index = 0, dates, columnWidth, rowHeight, taskHeight, handleWidth } = options;

    let type = [...task.type];

    let x1 = taskXCoordinate(task.start, dates, columnWidth);
    let x2 = taskXCoordinate(task.end, dates, columnWidth);
    const y = taskYCoordinate(index, rowHeight, taskHeight);

    let sx1 = (x2 - x1) * type[1].sectionXPositions[0] + x1;
    let sx2 = (x2 - x1) * type[1].sectionXPositions[1] + x1;

    return {
        ...task,
        x1,
        x2,
        sx1,
        sx2,
        y,
        index,
        handleWidth,
        height: taskHeight,
        barChildren: [],
        type,
    };
};

const handleMouseEvents = (
    svgX: number,
    action: BarMoveAction,
    selectedTask: TaskBar<MultiSectionTaskBar>,
    xStep: number,
    timeStep: number,
    initEventX1Delta: number,
): { isChanged: boolean; changedTask: TaskBar<MultiSectionTaskBar> } => {
    const changedTask: TaskBar<MultiSectionTaskBar> = { ...selectedTask };
    let isChanged = false;
    switch (action) {
        case 'start': {
            const newX1 = startByX(svgX, xStep, selectedTask);
            changedTask.x1 = newX1;
            changedTask.sx1 =
                (changedTask.x2 - changedTask.x1) * changedTask.type[1].sectionXPositions[0] + changedTask.x1;
            changedTask.sx2 =
                (changedTask.x2 - changedTask.x1) * changedTask.type[1].sectionXPositions[1] + changedTask.x1;

            isChanged = changedTask.x1 !== selectedTask.x1;
            if (isChanged) {
                changedTask.start = dateByX(newX1, selectedTask.x1, selectedTask.start, xStep, timeStep);

                changedTask.type[1].sections[0] = dateByPercents(
                    changedTask.start,
                    selectedTask.end,
                    changedTask.type[1].sectionXPositions[0],
                );

                changedTask.type[1].sections[1] = dateByPercents(
                    changedTask.start,
                    selectedTask.end,
                    changedTask.type[1].sectionXPositions[1],
                );
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
