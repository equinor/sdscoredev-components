import { FC } from '../../types';
import React, { Ref } from 'react';
import { columnSelectorReducer } from './columnSelectorReducer';

export type ColumnSelectorRef = {
    /**
     * Sets a column to be visible / hidden
     * @param column string
     * @param visible boolean
     */
    setColumn: (column: string, visible: boolean) => void;
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
};

const ColumnSelector: FC<ColumnSelectorProps> = (props) => {
    return (<React.Fragment {...props}>ColumnSelector</React.Fragment>)
}

ColumnSelector.reducer = { columnSelectorReducer }

export { ColumnSelector }
