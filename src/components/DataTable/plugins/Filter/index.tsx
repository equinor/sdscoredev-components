import { FC, ReducerProp } from '../../types';
import React, { MouseEventHandler } from 'react';
import { filterReducer } from './filterReducer';

export type FilterProps = {
    /**
     * The trigger button label
     */
    title?: string;
    /**
     * Callback for when click the trigger button
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;
    /**
     * If set, save the filter query to session storage
     */
    cacheKey?: string;
    /**
     * Storage, either `window.localStorage` or `window.sessionStorage`, default is `window.sessionStorage`
     */
    storage?: Storage;
};

const Filter: React.FC<FilterProps> & ReducerProp = (props) => {
    return <React.Fragment {...props}></React.Fragment>;
};

Filter.reducer = { filterReducer };

export { Filter };
