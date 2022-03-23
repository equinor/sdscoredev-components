import React, { forwardRef, useContext, useEffect } from 'react';
import { DispatchContext, StateContext } from './FormStore';
import { FormProps, FormRef } from './Form';

/**
 * Provides a container to add rows to. The rows will contain input components, 
 * and this component make sure the rows are dynamically created as a grid.
 * 
 * @param props 
 * @returns 
 */
 export const FormWrapper = forwardRef<FormRef, FormProps>((props: FormProps, ref) => {
    const { data } = props;
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);

    useEffect(() => {
        dispatch({ type: 'SET_DEFAULT_DATA', payload: data })
    }, [])

    const submit = () => {
        if (typeof props.onSubmit === 'function') {
            dispatch({ type: 'SET_ERRORS', payload: {} })
            props.onSubmit(state.formReducer.data)
        }
    }

    const cancel = () => {
        dispatch({ type: 'SET_ERRORS', payload: {} })
        dispatch({ type: 'RESET_TO_DEFAULT' })
    }

    /**
     * Forwards a reducer update. The payload can either be an Input event or an object with key values
     * 
     * @param payload 
     */
    const update = (payload: React.ChangeEvent<HTMLInputElement> | { [key: string]: any }) => {
        if (payload.target) {
            const { id, value } = payload.target;
            dispatch({ type: 'SET_DATA', payload: { ...state.formReducer.data, [id]: value } })
        } else {
            dispatch({ type: 'SET_DATA', payload: { ...state.formReducer.data, ...payload } })
        }
    }

    return props.children({ data: state.formReducer.data, submit, cancel, update })
});
