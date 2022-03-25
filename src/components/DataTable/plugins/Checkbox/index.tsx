import { FC } from '../../types';
import React from 'react';
import { checkboxReducer } from './checkboxReducer';

export type CheckboxProps = {
    /**
     * Callback that triggers when rows are selected. will provide an `Array<any>` of the selected `items` .
     */
    onChange: (items: Array<any>) => void;
};

const Checkbox: FC<CheckboxProps> = (props) => {
    return (<React.Fragment {...props}>Checkbox</React.Fragment>)
}

Checkbox.reducer = { checkboxReducer }

export { Checkbox }
