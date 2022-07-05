import { Task } from '../types/public-types';
import { BarTask, TaskTypeInternal } from '../types/bar-task';
import { BarMoveAction } from '../types/gantt-task-actions';

export const convertToBarTasks = (
    tasks: Task[],
    dates: Date[],
    columnWidth: number,
    rowHeight: number,
    taskHeight: number,
    handleWidth: number,
) => {
    let barTasks = tasks.map((t, i) => {
        return convertToBarTask(t, i, dates, columnWidth, rowHeight, taskHeight, handleWidth);
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

const convertToBarTask = (
    task: Task,
    index: number,
    dates: Date[],
    columnWidth: number,
    rowHeight: number,
    taskHeight: number,
    handleWidth: number,
): BarTask => {
    let barTask: BarTask;
    switch (task.type) {
        case 'milestone':
            barTask = convertToMilestone(task, (index = 0), dates, columnWidth, rowHeight, taskHeight, handleWidth);
            break;
        case 'project':
            barTask = convertToBar(task, index, dates, columnWidth, rowHeight, taskHeight, handleWidth);
            break;
        default:
            barTask = convertToBar(task, index, dates, columnWidth, rowHeight, taskHeight, handleWidth);
            break;
    }
    return barTask;
};

const convertToBar = (
    task: Task,
    index: number,
    dates: Date[],
    columnWidth: number,
    rowHeight: number,
    taskHeight: number,
    handleWidth: number,
): BarTask => {
    let x1: number;
    let x2: number;

    x1 = taskXCoordinate(task.start, dates, columnWidth);
    x2 = taskXCoordinate(task.end, dates, columnWidth);

    let typeInternal: TaskTypeInternal = task.type;
    if (typeInternal === 'task' && x2 - x1 < handleWidth * 2) {
        typeInternal = 'smalltask';
        x2 = x1 + handleWidth * 2;
    }

    const [progressWidth, progressX] = progressWithByParams(x1, x2, task.progress);
    const y = taskYCoordinate(index, rowHeight, taskHeight);
    const hideChildren = task.type === 'project' ? task.hideChildren : undefined;

    return {
        ...task,
        typeInternal,
        x1,
        x2,
        y,
        index,
        progressX,
        progressWidth,
        handleWidth,
        hideChildren,
        height: taskHeight,
        barChildren: [],
    };
};

const convertToMilestone = (
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

export const dateToProgress = (xDate: Date, dates: Date[]) => {
    const q = Math.abs(xDate.getTime() - dates[0].getTime());
    const d = Math.abs(dates[1].getTime() - dates[0].getTime());

    return q / d;
};

export const taskXCoordinate = (xDate: Date, dates: Date[], columnWidth: number) => {
    const index = dates.findIndex((d) => d.getTime() >= xDate.getTime()) - 1;

    const remainderMillis = xDate.getTime() - dates[index].getTime();
    const percentOfInterval = remainderMillis / (dates[index + 1].getTime() - dates[index].getTime());
    const x = index * columnWidth + percentOfInterval * columnWidth;
    return x;
};

export const taskYCoordinate = (index: number, rowHeight: number, taskHeight: number) => {
    const y = index * rowHeight + (rowHeight - taskHeight) / 2;
    return y;
};

export const progressWithByParams = (taskX1: number, taskX2: number, progress: number) => {
    const progressWidth = (taskX2 - taskX1) * progress * 0.01;
    let progressX: number;

    progressX = taskX1;

    return [progressWidth, progressX];
};

export const progressByProgressWidth = (progressWidth: number, barTask: BarTask) => {
    const barWidth = barTask.x2 - barTask.x1;
    const progressPercent = Math.round((progressWidth * 100) / barWidth);
    if (progressPercent >= 100) return 100;
    else if (progressPercent <= 0) return 0;
    else return progressPercent;
};

const progressByX = (x: number, task: BarTask) => {
    if (x >= task.x2) return 100;
    else if (x <= task.x1) return 0;
    else {
        const barWidth = task.x2 - task.x1;
        const progressPercent = Math.round(((x - task.x1) * 100) / barWidth);
        return progressPercent;
    }
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

const startByX = (x: number, xStep: number, task: BarTask) => {
    if (x >= task.x2 - task.handleWidth * 2) {
        x = task.x2 - task.handleWidth * 2;
    }
    const steps = Math.round((x - task.x1) / xStep);
    const additionalXValue = steps * xStep;
    const newX = task.x1 + additionalXValue;
    return newX;
};

const endByX = (x: number, xStep: number, task: BarTask) => {
    if (x <= task.x1 + task.handleWidth * 2) {
        x = task.x1 + task.handleWidth * 2;
    }
    const steps = Math.round((x - task.x2) / xStep);
    const additionalXValue = steps * xStep;
    const newX = task.x2 + additionalXValue;
    return newX;
};

const moveByX = (x: number, xStep: number, task: BarTask) => {
    const steps = Math.round((x - task.x1) / xStep);
    const additionalXValue = steps * xStep;
    const newX1 = task.x1 + additionalXValue;
    const newX2 = newX1 + task.x2 - task.x1;
    return [newX1, newX2];
};

const dateByX = (x: number, taskX: number, taskDate: Date, xStep: number, timeStep: number) => {
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
    selectedTask: BarTask,
    xStep: number,
    timeStep: number,
    initEventX1Delta: number,
): { isChanged: boolean; changedTask: BarTask } => {
    let result: { isChanged: boolean; changedTask: BarTask };
    switch (selectedTask.type) {
        case 'milestone':
            result = handleTaskBySVGMouseEventForMilestone(
                svgX,
                action,
                selectedTask,
                xStep,
                timeStep,
                initEventX1Delta,
            );
            break;
        default:
            result = handleTaskBySVGMouseEventForBar(svgX, action, selectedTask, xStep, timeStep, initEventX1Delta);
            break;
    }
    return result;
};

const handleTaskBySVGMouseEventForBar = (
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
        case 'progress':
            changedTask.progress = progressByX(svgX, selectedTask);

            isChanged = changedTask.progress !== selectedTask.progress;
            if (isChanged) {
                const [progressWidth, progressX] = progressWithByParams(
                    changedTask.x1,
                    changedTask.x2,
                    changedTask.progress,
                );
                changedTask.progressWidth = progressWidth;
                changedTask.progressX = progressX;
            }
            break;
        case 'start': {
            const newX1 = startByX(svgX, xStep, selectedTask);
            changedTask.x1 = newX1;
            isChanged = changedTask.x1 !== selectedTask.x1;
            if (isChanged) {
                changedTask.start = dateByX(newX1, selectedTask.x1, selectedTask.start, xStep, timeStep);

                const [progressWidth, progressX] = progressWithByParams(
                    changedTask.x1,
                    changedTask.x2,
                    changedTask.progress,
                );
                changedTask.progressWidth = progressWidth;
                changedTask.progressX = progressX;
            }
            break;
        }
        case 'end': {
            const newX2 = endByX(svgX, xStep, selectedTask);
            changedTask.x2 = newX2;
            isChanged = changedTask.x2 !== selectedTask.x2;
            if (isChanged) {
                changedTask.end = dateByX(newX2, selectedTask.x2, selectedTask.end, xStep, timeStep);

                const [progressWidth, progressX] = progressWithByParams(
                    changedTask.x1,
                    changedTask.x2,
                    changedTask.progress,
                );
                changedTask.progressWidth = progressWidth;
                changedTask.progressX = progressX;
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
                const [progressWidth, progressX] = progressWithByParams(
                    changedTask.x1,
                    changedTask.x2,
                    changedTask.progress,
                );
                changedTask.progressWidth = progressWidth;
                changedTask.progressX = progressX;
            }
            break;
        }
    }
    return { isChanged, changedTask };
};

const handleTaskBySVGMouseEventForMilestone = (
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
