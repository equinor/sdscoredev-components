import { Task, TaskBar } from '../bars/types';
import { BarMoveAction } from '../types/gantt-task-actions';

export const convertToBars = (
    tasks: Task[],
    dates: Date[],
    tickWidth: number,
    rowHeight: number,
    taskHeight: number,
    handleWidth: number,
) => {
    let barTasks = tasks.map((task, index) => {
        return task.type[0].convert(task, { index, dates, tickWidth, rowHeight, taskHeight, handleWidth });
    });

    // set dependencies
    barTasks = barTasks.map((task) => {
        const dependencies = task.dependencies || [];
        for (let j = 0; j < dependencies.length; j++) {
            const dependence = barTasks.findIndex((value) => value.id === dependencies[j]);
            if (dependence !== -1) barTasks[dependence].barChildren.push(task);
        }
        return task;
    });

    return barTasks;
};

export const convertToNuggets = (
    tasks: Task[],
    dates: Date[],
    tickWidth: number,
    rowHeight: number,
    taskHeight: number,
    handleWidth: number,
) => {
    const nuggets = tasks.map((task, index) => {
        if (task.nugget) {
            return task.nugget[0].convert(task, { index, dates, tickWidth, rowHeight, taskHeight, handleWidth });
        }

        return null;
    });

    return nuggets.filter((x) => x !== null);
};

export const dateToProgress = (xDate: Date, dates: Date[]) => {
    const q = Math.abs(xDate.getTime() - dates[0].getTime());
    const d = Math.abs(dates[1].getTime() - dates[0].getTime());

    return q / d;
};

export const taskXCoordinate = (xDate: Date, dates: Date[], tickWidth: number) => {
    const index = dates.findIndex((d) => d.getTime() >= xDate.getTime()) - 1;

    const remainderMillis = xDate.getTime() - dates[index].getTime();
    const percentOfInterval = remainderMillis / (dates[index + 1].getTime() - dates[index].getTime());
    const x = index * tickWidth + percentOfInterval * tickWidth;
    return x;
};

export const taskYCoordinate = (index: number, rowHeight: number, taskHeight: number) => {
    const y = index * rowHeight + (rowHeight - taskHeight) / 2;
    return y;
};

export const progressWithByParams = (taskX1: number, taskX2: number, progress: number) => {
    const progressWidth = (taskX2 - taskX1) * progress * 0.01;
    const progressX: number = taskX1;

    return { progressWidth, progressX };
};

export const progressByProgressWidth = (progressWidth: number, barTask: TaskBar) => {
    const barWidth = barTask.x2 - barTask.x1;
    const progressPercent = Math.round((progressWidth * 100) / barWidth);
    if (progressPercent >= 100) return 100;
    if (progressPercent <= 0) return 0;
    return progressPercent;
};

export const progressByX = (x: number, task: TaskBar) => {
    if (x >= task.x2) return 100;
    if (x <= task.x1) return 0;

    const barWidth = task.x2 - task.x1;
    const progressPercent = Math.round(((x - task.x1) * 100) / barWidth);
    return progressPercent;
};

export const getProgressPoint = (progressX: number, taskY: number, taskHeight: number) => {
    const point = [
        progressX - 5,
        taskY + taskHeight,
        progressX + 5,
        taskY + taskHeight,
        progressX,
        taskY + taskHeight - 8.66,
    ];
    return point.join(',');
};

export const startByX = (x: number, xStep: number, task: TaskBar) => {
    if (x >= task.x2 - task.handleWidth * 2) {
        // eslint-disable-next-line no-param-reassign
        x = task.x2 - task.handleWidth * 2;
    }
    const steps = Math.round((x - task.x1) / xStep);
    const additionalXValue = steps * xStep;
    const newX = task.x1 + additionalXValue;
    return newX;
};

export const endByX = (x: number, xStep: number, task: TaskBar) => {
    if (x <= task.x1 + task.handleWidth * 2) {
        // eslint-disable-next-line no-param-reassign
        x = task.x1 + task.handleWidth * 2;
    }
    const steps = Math.round((x - task.x2) / xStep);
    const additionalXValue = steps * xStep;
    const newX = task.x2 + additionalXValue;
    return newX;
};

export const moveByX = (x: number, xStep: number, task: TaskBar) => {
    const steps = Math.round((x - task.x1) / xStep);
    const additionalXValue = steps * xStep;
    const newX1 = task.x1 + additionalXValue;
    const newX2 = newX1 + task.x2 - task.x1;
    return [newX1, newX2];
};

export const dateByX = (x: number, taskX: number, taskDate: Date, xStep: number, timeStep: number) => {
    let newDate = new Date(((x - taskX) / xStep) * timeStep + taskDate.getTime());
    newDate = new Date(newDate.getTime() + (newDate.getTimezoneOffset() - taskDate.getTimezoneOffset()) * 60000);
    return newDate;
};

/**
 * Method handles event in real time(mousemove) and on finish(mouseup)
 */
export const handleTaskBySVGMouseEvent = (
    svgX: number,
    action: BarMoveAction,
    selectedTask: TaskBar,
    xStep: number,
    timeStep: number,
    initEventX1Delta: number,
): { isChanged: boolean; changedTask: TaskBar } => {
    return selectedTask.type[0].handleMouseEvents(svgX, action, selectedTask, xStep, timeStep, initEventX1Delta);
};
