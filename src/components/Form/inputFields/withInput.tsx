/* eslint-disable */
import { Label } from '@equinor/eds-core-react';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import styled from 'styled-components';
import Tooltip from '../../Tooltip';

export interface InputProps {
    id: string;
    label?: string;
    meta?: string;
    value?: any;
    tooltip?: string;
    isRequired?: boolean;
    onChange?: any;
}

export type Error = {
    error?: string;
}

export interface Options {
    debounceTime?: number; // Not used yet
}

const InputWrapper = styled.div`
    
`

const Header = styled.div`
    display: grid;
    grid-template-columns: min-content min-content;
    grid-row-gap: 30px;
    width: 100%;
    white-space: nowrap;
`

export const withInput = ({ debounceTime = 0 }: Options = {}) => <TOriginalProps extends {}>(
    Component:
        | React.ComponentClass<TOriginalProps & InputProps>
        | React.FunctionComponent<TOriginalProps & InputProps>,
) => {
    type ResultProps = TOriginalProps & InputProps;
    const Input = (props: ResultProps) => {

        const { id, value, label, tooltip } = props;
        console.log(props)
        const [err, setErr] = useState<Array<string> | null>(null)
        // const store = useSelector((state: any) => state);
        // const dispatch = useDispatch();

        /**
         * If errors exist in the errorReducer, 
         * see if that error belongs to this input.
         * Before this component unloads, clear the errors
         */
        // useEffect(() => {
        //     if (store.error && store.error.data && store.error.data.errors) {
        //         const errors = store.error.data.errors;
        //         const test = id.charAt(0).toUpperCase() + id.slice(1)

        //         if (errors[test]) {
        //             setErr(errors[test])
        //         }
        //     }

        //     // Clear errors on unload
        //     return () => {
        //         if (store.error && store.error.data) dispatch(setError(null))
        //     };
        // }, [store.error])

        /**
         * Reset the validation errors if input value changes
         */
        useEffect(() => {
            if (err) setErr(null)
        }, [value])

        return (
            <InputWrapper>
                <Header>
                    {label && <Label label={label} />}
                    {tooltip && <Tooltip title={tooltip} placement="bottom" />}
                </Header>
                <Component {...props} error={err} />
            </InputWrapper>
        );
    };

    return Input;
};


