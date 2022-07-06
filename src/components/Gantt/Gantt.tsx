import { Children, useState } from 'react';
import { DisplayOption, EventOption, StylingOption, Task } from './types/public-types';
import React from 'react';
import { GanttStore } from './GanttStore';
import { ganttReducer } from './reducers/ganttReducer';
import { GanttData } from './GanttData';

export interface GanttProps extends EventOption, DisplayOption, StylingOption {
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
}

export const Gantt = (props: GanttProps) => {
    const { children, reducers = [] } = props;
    const [tasks, setTasks] = useState<Task[]>(props.tasks);

    const components = Children.toArray(children);
    const grid: any = components.find((x: JSX.Element) => x.type.displayName === 'Gantt.Grid');

    return (
        <GanttStore components={components} reducers={{ ganttReducer, ...reducers }}>
            <GanttData {...props} tasks={tasks} onSetTasks={setTasks} grid={grid} />
        </GanttStore>
    );
};
