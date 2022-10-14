import { taskXCoordinate, taskYCoordinate } from '../../helpers/bar-helper';
import { MilestoneNugget, MilestoneNuggetProps } from './MilestoneNugget';
import { Task, TaskBar, TaskConvertOptions } from '../../bars/types';

type Nugget = {
    nugget: any;
};

export const convert = (
    task: Task<MilestoneNuggetProps>,
    nugget: any,
    options: TaskConvertOptions,
): TaskBar<Nugget> => {
    const { index = 0, dates, tickWidth, rowHeight, taskHeight, handleWidth } = options;

    const x = taskXCoordinate(nugget[1].start, dates, tickWidth);
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
        nugget,
    };
};

// @ts-ignore
MilestoneNugget.convert = convert;

export { MilestoneNugget };
