import React from 'react';
import { ReducerProp } from 'types';
import { taskListReducer } from './taskListReducer';

export type TaskListProps = {
    width?: number;
};

const TaskList: React.FC<TaskListProps> & ReducerProp = (props) => {
    return <React.Fragment {...props}>TaskList</React.Fragment>;
};

TaskList.reducer = { taskListReducer };

export { TaskList };
