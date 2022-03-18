/* eslint-disable */
import { Label as EdsLabel } from '@equinor/eds-core-react';
import React, { ChangeEventHandler, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Tooltip } from '../../Tooltip';
import { DispatchContext, StateContext } from '../FormStore';

export interface InputProps {
    id: string;
    label?: string;
    meta?: string;
    value?: any;
    tooltip?: string;
    isRequired?: boolean;
    onChange?: any;
    edit?: boolean;
}

export type Error = {
    error?: string;
}

export interface Options {
    debounceTime?: number; // Not used yet
}

const InputWrapper = styled.div``

const Header = styled.div`
    display: grid;
    grid-template-columns: min-content min-content;
    padding-bottom: 2px;
    width: 100%;
    white-space: nowrap;
`

const ValidationError = styled(EdsLabel)`
    color: rgb(235, 0, 0);
    margin-top: 4px;
    height: 16px;
`

const Label = styled(EdsLabel)`
    height: 16px;

    & span {
        display: inline-flex;
        align-items: center;
        line-height: 0.750rem;
    }
`

const Empty = styled.div`
    margin-top: 4px;
    height: 16px;
`

export const withInput = ({ debounceTime = 0 }: Options = {}) => <TOriginalProps extends {}>(
    Component:
        | React.ComponentClass<TOriginalProps & InputProps>
        | React.FunctionComponent<TOriginalProps & InputProps>,
) => {
    type ResultProps = TOriginalProps & InputProps;
    const Input = (props: ResultProps) => {

        const { id, value, label, tooltip } = props;
        const [validationErrors, setValidationErrors] = useState<Array<string> | undefined>(undefined)
        const state: any = useContext(StateContext);
        const dispatch: any = useContext(DispatchContext);


        /**
         * If errors exist in the errorReducer, 
         * see if that error belongs to this input.
         * Before this component unloads, clear the errors
         */
        useEffect(() => {
            const values = state.validationReducer?.errors;

            if (values) {
                const key = id.charAt(0).toUpperCase() + id.slice(1)
                if (values[key]) {
                    setValidationErrors(values[key])
                }
            }
        }, [state.validationReducer?.errors])

        /**
         * Reset the validation errors if input value changes
         */
        useEffect(() => {
            if (validationErrors) setValidationErrors(undefined)
        }, [value])

        return (
            <InputWrapper>
                <Header>
                    {label && <Label label={label} />}
                    {tooltip && <Tooltip title={tooltip} placement="bottom" />}
                </Header>
                <Component {...props} />
                {validationErrors ? validationErrors.map((validationError: string) => (
                    <ValidationError label={validationError} />
                )) : <Empty></Empty>}
            </InputWrapper>
        );
    };

    return Input;
};


