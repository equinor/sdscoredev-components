import { Gantt as BaseGantt } from './Gantt';
import { Grid } from './plugins/Grid';
import { TaskList } from './plugins/TaskList';
import { Tooltip } from './plugins/Tooltip';
import { DataTable } from './plugins/DataTable';
import { Toolbar } from './plugins/Toolbar';

type GanttCompound = typeof BaseGantt & {
    Grid: typeof Grid;
    TaskList: typeof TaskList;
    Tooltip: typeof Tooltip;
    DataTable: typeof DataTable;
    Toolbar: typeof Toolbar;
};

const Gantt = BaseGantt as GanttCompound;

Gantt.Grid = Grid;
Gantt.TaskList = TaskList;
Gantt.Tooltip = Tooltip;
Gantt.DataTable = DataTable;
Gantt.Toolbar = Toolbar;

Gantt.Grid.displayName = 'Gantt.Grid';
Gantt.TaskList.displayName = 'Gantt.TaskList';
Gantt.Tooltip.displayName = 'Gantt.Tooltip';
Gantt.DataTable.displayName = 'Gantt.DataTable';
Gantt.Toolbar.displayName = 'Gantt.Toolbar';

export { Gantt };
export { ViewMode } from 'types';
export * from './bars/index';
export * from './nuggets/index';
export type { StylingOption, EventOption } from './types/public-types';
export type { Bar, Task } from './bars/types';
