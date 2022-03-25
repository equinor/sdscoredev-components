import React, { useContext, useEffect } from 'react';
import { CheckboxProps } from './index';
import { StateContext } from '../../DataTableStore';

export type InternalCheckboxProps = {};

export const Checkbox: React.FC<InternalCheckboxProps & CheckboxProps> = ({ onChange }) => {
    const state: any = useContext(StateContext);

    /**
     * TODO: This fires one time at initialization. Must do something to prevent it. Maybe with a useRef count.
     */
    useEffect(() => {
        if (typeof onChange === 'function') onChange(state.checkboxReducer.selected)
    }, [state.checkboxReducer.selected])

    return <></>
}
