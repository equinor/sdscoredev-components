import { MilestoneNugget, MilestoneNuggetProps } from './MilestoneNugget';
import { taskXCoordinate, taskYCoordinate } from 'components/Gantt/helpers/bar-helper';
import { Task, TaskBar, TaskConvertOptions } from '../../bars/types';

export type MilestoneTaskBar = {} & MilestoneNuggetProps;

export const convert = (task: Task<MilestoneNuggetProps>, options: TaskConvertOptions): TaskBar => {
    const { index = 0, dates, columnWidth, rowHeight, taskHeight, handleWidth } = options;

    let nugget = [...task.nugget];

    console.log(nugget[1].date, dates.length);

    const x = taskXCoordinate(nugget[1].date, dates, columnWidth);
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
        handleWidth,
        height: rotatedHeight,
        hideChildren: undefined,
        barChildren: [],
    };
};

// @ts-ignore
MilestoneNugget.convert = convert;

export { MilestoneNugget };
