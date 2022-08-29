import React, { Ref } from 'react';
import { ReducerProp } from 'types';
import { gridReducer } from './gridReducer';

export type GridRef = {
    /**
     * Callback for resize event
     */
    handleResize: () => void;
} | null;

export type GridProps = {
    /**
     * The color that will fill the column of today
     */
    todayColor: string;
    /**
     * Column width, will be reset by changing view
     */
    tickWidth: number;
    /**
     * When set to a date range, the gantt chart will zoom into and show that date range
     */
    focus?: Array<Date>;
    /**
     * A ref to this element
     */
    ref: Ref<GridRef>;
};

const Grid: React.FC<GridProps> & ReducerProp = (props) => {
    return <React.Fragment {...props}>Grid</React.Fragment>;
};

Grid.reducer = { gridReducer };

export { Grid };
