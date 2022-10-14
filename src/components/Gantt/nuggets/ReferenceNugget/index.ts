import { taskXCoordinate, taskYCoordinate } from '../../helpers/bar-helper';
import { ReferenceNugget, ReferenceNuggetProps } from './ReferenceNugget';
import { Task, TaskBar, TaskConvertOptions } from '../../bars/types';

type Nugget = {
    nugget: any;
};

export const convert = (
    task: Task<ReferenceNuggetProps>,
    nugget: any,
    options: TaskConvertOptions,
): TaskBar<Nugget> => {
    const { index = 0, dates, tickWidth, rowHeight, taskHeight, handleWidth } = options;

    const x1 = taskXCoordinate(nugget[1].start, dates, tickWidth);
    const x2 = taskXCoordinate(nugget[1].end, dates, tickWidth);
    const y = taskYCoordinate(index, rowHeight, taskHeight);

    return {
        ...task,
        end: task.start,
        x1,
        x2,
        y,
        index,
        handleWidth,
        height: taskHeight,
        hideChildren: undefined,
        barChildren: [],
        nugget,
    };
};

// @ts-ignore
ReferenceNugget.convert = convert;

export { ReferenceNugget };
