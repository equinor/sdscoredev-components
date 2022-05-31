import { FC } from '../../types';
import React, { Ref } from 'react';
import { checkboxReducer } from './checkboxReducer';

export type CheckboxRef = {
    /**
     * Selects a row 
     * @param item any
     */
    check: (item: any) => void;
    uncheck: (item: any) => void;
} | null;

export type CheckboxProps = {
    /**
     * Callback that triggers when rows are selected. will provide an `Array<any>` of the selected `items` .
     */
    onChange: (items: Array<any>) => void;
    /**
     * Set the key to compare agains, default is `id`
     */
    getKey?: string;
    /**
      * A ref to this element
      */
    ref?: Ref<CheckboxRef>;
};

const Checkbox: FC<CheckboxProps> = (props) => {
    return (<React.Fragment {...props}>Checkbox</React.Fragment>)
}

Checkbox.reducer = { checkboxReducer }

export { Checkbox }
