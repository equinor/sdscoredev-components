import React from 'react';
import { ReducerProp } from 'types';
import { gridReducer } from './gridReducer';

export type GridProps = {
    /**
     * The color that will fill the column of today
     */
    todayColor: string;
    /**
     * Column width, will be reset by changing view
     */
    columnWidth: number;
    focus?: Array<Date>;
};

const Grid: React.FC<GridProps> & ReducerProp = (props) => {
    return <React.Fragment {...props}>Grid</React.Fragment>;
};

Grid.reducer = { gridReducer };

export { Grid };
