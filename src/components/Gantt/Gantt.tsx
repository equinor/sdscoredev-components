import { Children } from 'react';
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

    const components = Children.toArray(children);

    return (
        <GanttStore components={components} reducers={{ ganttReducer, ...reducers }}>
            <GanttData {...props} />
        </GanttStore>
    );
};
