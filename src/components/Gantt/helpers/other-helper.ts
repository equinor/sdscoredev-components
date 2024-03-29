import React from 'react';
import { Task, TaskBar } from '../bars/types';

export function isKeyboardEvent(
    event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent,
): event is React.KeyboardEvent {
    return (event as React.KeyboardEvent).key !== undefined;
}

export function isMouseEvent(
    event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent,
): event is React.MouseEvent {
    return (event as React.MouseEvent).clientX !== undefined;
}

export function isTaskBar(task: Task | TaskBar): task is TaskBar {
    return (task as TaskBar).x1 !== undefined;
}

export function removeHiddenTasks(tasks: Task[]) {
    const groupedTasks = tasks.filter((t) => t.hideChildren && t.type === 'project');
    if (groupedTasks.length > 0) {
        for (let i = 0; groupedTasks.length > i; i++) {
            const groupedTask = groupedTasks[i];
            const children = getChildren(tasks, groupedTask);
            // eslint-disable-next-line no-param-reassign
            tasks = tasks.filter((t) => children.indexOf(t) === -1);
        }
    }
    return tasks;
}

function getChildren(taskList: Task[], task: Task) {
    let tasks: Task[] = [];
    if (task.type !== 'project') {
        tasks = taskList.filter((t) => t.dependencies && t.dependencies.indexOf(task.id) !== -1);
    } else {
        tasks = taskList.filter((t) => t.project && t.project === task.id);
    }
    const taskChildren = tasks.reduce((children: Task[], t) => children.concat(children, getChildren(taskList, t)), []);
    tasks = tasks.concat(tasks, taskChildren);
    return tasks;
}

export const sortTasks = (taskA: Task, taskB: Task) => {
    const orderA = taskA.displayOrder || Number.MAX_VALUE;
    const orderB = taskB.displayOrder || Number.MAX_VALUE;
    if (orderA > orderB) {
        return 1;
    }
    if (orderA < orderB) {
        return -1;
    }
    return 0;
};
