/* eslint-disable react/jsx-pascal-case */
import React, { useContext, useEffect } from 'react';
import { DispatchContext, StateContext } from '../FormStore';
import { InternalValidationProps, ValidationProps } from './types';

export const Validation: React.FC<InternalValidationProps & ValidationProps> = ({ errors }) => {
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);

    useEffect(() => {
        if (errors) {
            dispatch({ type: 'SET_ERRORS', payload: errors })
        } else {
            dispatch({ type: 'SET_ERRORS', payload: null })
        }
    }, [errors])
    
    return <></>
}
