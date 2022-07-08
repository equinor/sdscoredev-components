import { Children, useState } from 'react';
import { DisplayOption, EventOption, StylingOption } from './types/public-types';
import React from 'react';
import { GanttStore } from './GanttStore';
import { ganttReducer } from './reducers/ganttReducer';
import { GanttData } from './GanttData';
import { Task } from './bars/types';

export type GanttProps = {
    tasks: Task[];
    children?: any;
    /**
     * Object containing additional reducers (plugins) to be used. They will be handled as reducer slices
     * and will manipulate the Gantt root state, as well as it's own separate states.
     *
     * `dataTableReducer` is the default reducer that will always be the root state, this reducer is automatically added.
     *
     * Most common reducer to add is `paginationReducer`. It will add `pageSize` and `pageIndex` as state params.
     */
    reducers?: any;
} & EventOption &
    DisplayOption &
    StylingOption;

export const Gantt = (props: GanttProps) => {
    const { children, reducers = [] } = props;
    const [tasks, setTasks] = useState<Task[]>(props.tasks);

    const components = Children.toArray(children);
    const grid: any = components.find((x: JSX.Element) => x.type.displayName === 'Gantt.Grid');
    const taskList: any = components.find((x: JSX.Element) => x.type.displayName === 'Gantt.TaskList');

    return (
        <GanttStore components={components} reducers={{ ganttReducer, ...reducers }}>
            <GanttData {...props} tasks={tasks} onSetTasks={setTasks} grid={grid} />
        </GanttStore>
    );
};
