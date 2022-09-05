import {
    dateByX,
    endByX,
    moveByX,
    startByX,
    taskXCoordinate,
    taskYCoordinate,
} from 'components/Gantt/helpers/bar-helper';
import { BarMoveAction } from 'components/Gantt/types/gantt-task-actions';
import { MultiSectionBar, MultiSectionBarProps } from './MultiSectionBar';
import { Task, TaskBar, TaskConvertOptions } from '../types';

export type MultiSectionTaskBar = {} & MultiSectionBarProps;

export const convert = (
    task: Task<MultiSectionBarProps>,
    options: TaskConvertOptions,
): TaskBar<MultiSectionTaskBar> => {
    const { index = 0, dates, tickWidth, rowHeight, taskHeight, handleWidth } = options;

    const type = [...task.type];

    const x1 = taskXCoordinate(task.start, dates, tickWidth);
    const x2 = taskXCoordinate(task.end, dates, tickWidth);
    const y = taskYCoordinate(index, rowHeight, taskHeight);

    if (type[1].dates.length) {
        type[1].sections = type[1].dates;
    }

    return {
        ...task,
        x1,
        x2,
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
    // eslint-disable-next-line default-case
    switch (action) {
        case 'start': {
            const newX1 = startByX(svgX, xStep, selectedTask);
            changedTask.x1 = newX1;

            const getNewSectionDate = (index: number) => {
                const oldX =
                    (selectedTask.x2 - selectedTask.x1) * selectedTask.type[1].sectionXPositions[index] +
                    selectedTask.x1;
                const sectionX =
                    (changedTask.x2 - changedTask.x1) * changedTask.type[1].sectionXPositions[index] + changedTask.x1;
                return dateByX(sectionX, oldX, selectedTask.type[1].sections[index], xStep, timeStep);
            };

            isChanged = changedTask.x1 !== selectedTask.x1;
            if (isChanged) {
                changedTask.start = dateByX(newX1, selectedTask.x1, selectedTask.start, xStep, timeStep);

                // const oldX =
                //     (selectedTask.x2 - selectedTask.x1) * selectedTask.type[1].sectionXPositions[0] + selectedTask.x1;
                // const sectionX =
                //     (changedTask.x2 - changedTask.x1) * changedTask.type[1].sectionXPositions[0] + changedTask.x1;
                // const newD = dateByX(sectionX, oldX, selectedTask.type[1].sections[0], xStep, timeStep);

                for (let i = 0; i < changedTask.type[1].sections.length; i++) {
                    changedTask.type[1].dates[i] = getNewSectionDate(i);
                }
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
