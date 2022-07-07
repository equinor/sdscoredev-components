import { Gantt as BaseGantt } from './Gantt';
import { Grid } from './plugins/Grid';

type GanttCompound = typeof BaseGantt & {
    Grid: typeof Grid;
};

const Gantt = BaseGantt as GanttCompound;

Gantt.Grid = Grid;

Gantt.Grid.displayName = 'Gantt.Grid';

export { Gantt };
export { ViewMode } from './types/public-types';
export * from './bars/index';
export type { GanttProps, StylingOption, DisplayOption, EventOption } from './types/public-types';
export type { Bar, Task } from './bars/types';
