import { dateByX, endByX, moveByX, startByX, taskXCoordinate, taskYCoordinate } from '../../helpers/bar-helper';

import { Task, TaskBar, TaskConvertOptions } from '../types';
import { EmptyBar } from './EmptyBar';

export type EmptyBarType = {};

export const convert = (task: Task, options: TaskConvertOptions): TaskBar<EmptyBarType> => {
    const { index = 0, dates, tickWidth, rowHeight, taskHeight, handleWidth } = options;

    const type = [...task.type];

    const x1 = taskHeight * 0.5;
    const x2 =  taskHeight * 0.5;
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
        type,
    };
};

const handleMouseEvents = () => {
    return null;
};

// @ts-ignore
EmptyBar.convert = convert;
// @ts-ignore
EmptyBar.handleMouseEvents = handleMouseEvents;

export { EmptyBar };
