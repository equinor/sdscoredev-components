import { dateByX, endByX, moveByX, startByX, taskXCoordinate, taskYCoordinate } from '../../helpers/bar-helper';
import { BarMoveAction } from '../../types/gantt-task-actions';
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

    const getNewSectionDate = (index: number) => {
        const delta = selectedTask.type[1].sectionXPositions[index];
        const start = new Date(changedTask.start).getTime();
        const end = new Date(changedTask.end).getTime();

        return new Date((end - start) * delta + start);
    };

    // eslint-disable-next-line default-case
    switch (action) {
        case 'start': {
            const newX1 = startByX(svgX, xStep, selectedTask);
            changedTask.x1 = newX1;

            isChanged = changedTask.x1 !== selectedTask.x1;
            if (isChanged) {
                changedTask.start = dateByX(newX1, selectedTask.x1, selectedTask.start, xStep, timeStep);

                for (let i = 0; i < changedTask.type[1].sections.length; i++) {
                    changedTask.type[1].dates[i] = getNewSectionDate(i);
                    changedTask.type[1].sections[i] = getNewSectionDate(i);
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

                for (let i = 0; i < changedTask.type[1].sections.length; i++) {
                    changedTask.type[1].dates[i] = getNewSectionDate(i);
                    changedTask.type[1].sections[i] = getNewSectionDate(i);
                }
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

                for (let i = 0; i < changedTask.type[1].sections.length; i++) {
                    changedTask.type[1].dates[i] = getNewSectionDate(i);
                    changedTask.type[1].sections[i] = getNewSectionDate(i);
                }
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
