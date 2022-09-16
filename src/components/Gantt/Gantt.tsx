import React, { Children, forwardRef, RefAttributes, useRef, useState } from 'react';
import { ViewMode } from 'types';
import { EventOption, StylingOption } from './types/public-types';
import { GanttStore } from './GanttStore';
import { ganttReducer } from './reducers/ganttReducer';
import { GanttData } from './GanttData';
import { Task } from './bars/types';

export type GanttProps = {
    tasks: Task[];
    children?: any;
    focus?: any[];
    /**
     * Which way to split the calendar into ticks.
     * When changed, the grid and calendar redraw.
     */
    viewMode: ViewMode;
    /**
     * DEPRECATED: use `focus` instead.
     */
    viewDate?: Date;
    /**
     * Object containing additional reducers (plugins) to be used. They will be handled as reducer slices
     * and will manipulate the Gantt root state, as well as it's own separate states.
     *
     * `dataTableReducer` is the default reducer that will always be the root state, this reducer is automatically added.
     *
     * Most common reducer to add is `paginationReducer`. It will add `pageSize` and `pageIndex` as state params.
     */
    reducers?: any;
    /**
     * If set yo true, it will be impossible to change the data in the Gantt
     */
    readonly?: boolean;
} & EventOption &
    StylingOption;

export const Gantt: React.FC<GanttProps & RefAttributes<HTMLDivElement>> = forwardRef((props, ref) => {
    const { children, reducers = [] } = props;
    const [tasks, setTasks] = useState<Task[]>(props.tasks);

    const components = Children.toArray(children);
    const grid: any = components.find((x: JSX.Element) => x.type.displayName === 'Gantt.Grid');
    const tooltip: any = components.find((x: JSX.Element) => x.type.displayName === 'Gantt.Tooltip');
    const taskList: any = components.find((x: JSX.Element) => x.type.displayName === 'Gantt.TaskList');
    const dataTable: any = components.find((x: JSX.Element) => x.type.displayName === 'Gantt.DataTable');
    const toolbar: any = components.find((x: JSX.Element) => x.type.displayName === 'Gantt.Toolbar');

    return (
        <GanttStore components={components} reducers={{ ganttReducer, ...reducers }}>
            <div ref={ref}>
                <GanttData
                    {...props}
                    tasks={props.tasks}
                    onSetTasks={setTasks}
                    plugins={{ grid, taskList, tooltip, dataTable, toolbar }}
                />
            </div>
        </GanttStore>
    );
});
