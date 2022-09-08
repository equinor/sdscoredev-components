import { Gantt as BaseGantt } from './Gantt';
import { Grid } from './plugins/Grid';
import { TaskList } from './plugins/TaskList';
import { Tooltip } from './plugins/Tooltip';

type GanttCompound = typeof BaseGantt & {
    Grid: typeof Grid;
    TaskList: typeof TaskList;
    Tooltip: typeof Tooltip;
};

const Gantt = BaseGantt as GanttCompound;

Gantt.Grid = Grid;
Gantt.TaskList = TaskList;
Gantt.Tooltip = Tooltip;

Gantt.Grid.displayName = 'Gantt.Grid';
Gantt.TaskList.displayName = 'Gantt.TaskList';
Gantt.Tooltip.displayName = 'Gantt.Tooltip';

export { Gantt };
export { ViewMode } from 'types';
export * from './bars/index';
export * from './nuggets/index';
export type { StylingOption, EventOption } from './types/public-types';
export type { Bar, Task } from './bars/types';
