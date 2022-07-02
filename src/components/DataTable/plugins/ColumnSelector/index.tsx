import { FC, ReducerProp } from '../../types';
import React, { FunctionComponent, Ref } from 'react';
import { columnSelectorReducer } from './columnSelectorReducer';

export type ColumnSelectorRef = {
    /**
     * Sets a column to be visible / hidden
     * @param column string
     * @param visible boolean
     */
    setColumn: (column: string, visible: boolean) => void;
    /**
     * Sets multiple columns to be visible / hidden
     * @param column string
     * @param visible boolean
     */
    setColumns: (column: Array<string>, visible: boolean) => void;
} | null;

export type ColumnSelectorProps = {
    /**
     * The trigger button label
     */
    title?: string;
    /**
     * The trigger button icon
     */
    icon?: JSX.Element;
    /**
     * A ref to this element
     */
    ref?: Ref<ColumnSelectorRef>;
    /**
     * If set, save the selected columns to session storage
     */
    cacheKey?: string;
    /**
     * Storage, either `window.localStorage` or `window.sessionStorage`, default is `window.sessionStorage`
     */
    storage?: Storage;
    /**
     * The number of columns used to divide the columns options; default is `2`
     */
    columnsNumber?: number;
    /**
     * The number of rows to divide the columns options; default is `5`
     */
    rowsNumber?: number;
};

const ColumnSelector: React.FC<ColumnSelectorProps> & ReducerProp = (props) => {
    return <React.Fragment {...props}>ColumnSelector</React.Fragment>;
};

ColumnSelector.reducer = { columnSelectorReducer };

export { ColumnSelector };
