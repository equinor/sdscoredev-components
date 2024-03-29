import React, { MouseEventHandler } from 'react';
import { ReducerProp } from 'types';

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
    /**
     * If set to true, do not render filter button
     */
    hideButton?: boolean;
};

const Filter: React.FC<FilterProps> & ReducerProp = (props) => {
    return <React.Fragment {...props} />;
};

Filter.reducer = { filterReducer };

export { Filter };
