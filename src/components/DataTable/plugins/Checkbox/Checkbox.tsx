import { Typography } from '@equinor/eds-core-react';
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from 'react';
import { CheckboxProps, CheckboxRef } from '.';
import { DispatchContext, StateContext } from '../../DataTableStore';

export const Checkbox = forwardRef<
    CheckboxRef,
    CheckboxProps
>((props: CheckboxProps, ref) => {
    const { onChange, getKey } = props
    const state: any = useContext(StateContext);
    // const init = useRef(0);
    const dispatch: any = useContext(DispatchContext);

    /**
     * TODO: This fires one time at initialization. Must do something to prevent it. Maybe with a useRef count.
     */
    useEffect(() => {
        if (typeof onChange === 'function') onChange(state.checkboxReducer.selected)
    }, [state.checkboxReducer.selected])


    /**
     * Exposes a way to check a checkbox by reference
     *
     * @param item any
     */
    const check = (item: any) => {
        let result = [];

        result = [
            ...new Set([...state.checkboxReducer.selected, item]),
        ];

        dispatch({ type: 'SET_SELECTED', payload: result });
    }

    /**
     * Exposes a way to uncheck a checkbox by reference
     *
     * @param item any
     */
    const uncheck = (item: any) => {
        let result = [...state.checkboxReducer.selected];

        result.splice(
            state.checkboxReducer.selected.findIndex((x: any) => x[getKey || 'id'] === item[getKey || 'id']),
            1,
        );

        dispatch({ type: 'SET_SELECTED', payload: result });
    }

    useImperativeHandle(ref, () => ({ check, uncheck }), [state.checkboxReducer.selected]);

    return (<>
    <Typography variant="h6">Default columns</Typography>
    </>);
})
