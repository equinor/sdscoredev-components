import React, { Ref } from 'react';
import { ReducerProp } from 'types';
import { checkboxReducer } from './checkboxReducer';

export type CheckboxRef = {
    /**
     * Selects a row
     * @param item any
     */
    check: (item: any) => void;
    uncheck: (item: any) => void;
    clear: () => void;
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
    /**
     * Optional prop to show or hide the checkbox column
     */
    visible?: boolean;
    /**
     * Optional prop to show items as checked
     */
    preCheckedItems?: Array<any>;

};

const Checkbox: React.FC<CheckboxProps> & ReducerProp = (props) => {
    return <React.Fragment {...props}>Checkbox</React.Fragment>;
};

Checkbox.reducer = { checkboxReducer };

export { Checkbox };
