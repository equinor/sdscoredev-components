import React, { Children, cloneElement, forwardRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { DispatchContext, FormStore, StateContext } from './FormStore';
import { FormProps } from './Form';

export type FormRef = {} | null;

/**
 * Provides a container to add rows to. The rows will contain input components, 
 * and this component make sure the rows are dynamically created as a grid.
 * 
 * @param props 
 * @returns 
 */
 export const FormWrapper: React.FC<FormProps> = (props) => {
    const { data } = props;
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);

    useEffect(() => {
        if (!data) return;
        dispatch({ type: 'SET_DEFAULT_DATA', payload: data })
    }, [data])

    const submit = () => {
        if (typeof props.onSubmit === 'function') props.onSubmit(state.formReducer.data)
    }

    const cancel = () => {
        // setData(defaultData);
    }

    const update = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        dispatch({ type: 'SET_DATA', payload: { ...state.formReducer.data, [id]: value } })
    }

    return props.children({ data: state.formReducer.data, submit, cancel, update })
};
