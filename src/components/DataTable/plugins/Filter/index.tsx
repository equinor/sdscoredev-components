import { FC, ReducerProp } from '../../types';
import React, { MouseEventHandler } from 'react';

export type FilterProps = {
    /**
     * The trigger button label
     */
    title?: string;
    /**
     * Callback for when click the trigger button
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Filter: React.FC<FilterProps> & ReducerProp = (props) => {
    return (<React.Fragment {...props}></React.Fragment>)
}

export { Filter };
