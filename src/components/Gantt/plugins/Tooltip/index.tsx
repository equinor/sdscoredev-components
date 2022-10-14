import React from 'react';
import { ReducerProp } from 'types';
import { TaskBar } from '../../bars/types';
// import { tooltipReducer } from './tooltipReducer';

export type TooltipProps = {
    /**
     * If set, will render the content of the tooltip.
     */
    render?: (task: TaskBar) => any;
};

const Tooltip: React.FC<TooltipProps> & ReducerProp = (props) => {
    return <React.Fragment {...props}>Tooltip</React.Fragment>;
};

// Tooltip.reducer = { tooltipReducer };

export { Tooltip };
