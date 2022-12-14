import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from 'react';

import { DispatchContext, StateContext } from '../../DataTableStore';
import { CheckboxProps, CheckboxRef } from './index';

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>((props: CheckboxProps, ref) => {
    const { onChange, getKey, visible, preCheckedItems } = props;
    const state: any = useContext(StateContext);
    // const init = useRef(0);
    const dispatch: any = useContext(DispatchContext);

    /**
     * TODO: This fires one time at initialization. Must do something to prevent it. Maybe with a useRef count.
     */
    useEffect(() => {
        if (typeof onChange === 'function') onChange(state.checkboxReducer.selected);
    }, [state.checkboxReducer.selected]);

    /**
     * Optional prop 'visible' to show or hide the checkbox column
     */
    useEffect(() => {
        if (typeof visible !== 'undefined') {
            dispatch({ type: 'SET_VISIBLE', payload: visible });
        }
    }, [visible]);

    useEffect(() => {
        if (preCheckedItems && preCheckedItems.length) {
            const result = [...new Set(...state.checkboxReducer.selected, preCheckedItems)];
            dispatch({ type: 'SET_SELECTED', payload: result });
        }
    }, []);

    /**
     * Exposes a way to check a checkbox by reference
     *
     * @param item any
     */
    const check = (item: any) => {
        let result = [];

        result = [...new Set([...state.checkboxReducer.selected, item])];

        dispatch({ type: 'SET_SELECTED', payload: result });
    };

    /**
     * Exposes a way to uncheck a checkbox by reference
     *
     * @param item any
     */
    const uncheck = (item: any) => {
        const result = [...state.checkboxReducer.selected];

        result.splice(
            state.checkboxReducer.selected.findIndex((x: any) => x[getKey || 'id'] === item[getKey || 'id']),
            1,
        );

        dispatch({ type: 'SET_SELECTED', payload: result });
    };

    /**
     * Exposes a way to clear all checked
     *
     */
    const clear = () => {
        dispatch({ type: 'SET_SELECTED', payload: [] });
    };

    useImperativeHandle(ref, () => ({ check, uncheck, clear }), [state.checkboxReducer.selected]);

    return <></>;
});
