/* eslint-disable */
import { Label as EdsLabel } from '@equinor/eds-core-react';
import React, { ChangeEventHandler, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Tooltip } from '../../Tooltip';
import { DispatchContext, StateContext } from '../FormStore';
import { ValidationDispatchContext, ValidationStateContext } from '../Validation/ValidationProvider';
import { ReadOnly } from './ReadOnly';

export interface InputProps {
    /**
     * Id of input field, that will be forwarded in the change event.
     * Must be identical to one key in the form object.
     */
    id: string;
    /**
     * Label that will be displayed above the input field
     */
    label?: string;
    /**
     * TODO: Not used yet
     */
    meta?: string;
    /**
     * Controlled value, recieved from the form object
     */
    value?: any;
    /**
     * Text to be shown in a tooltip. 
     * Adds a question mark icon to the right of the label
     */
    tooltip?: string;
    /**
     * Displays `* Requeried*  to the top right of the input field.
     */
    isRequired?: boolean;
    /**
     * Callback for changes in the input
     */
    onChange?: any;
    /**
     * Toogles the input between edit mode and read only mode
     */
    edit?: boolean;
    /**
     * TODO: Not used, probably deprecated
     */
    disabled?: boolean;
    /**
     * If set to true, allow the input field to grow if needed.
     */
    flexGrow?: boolean;
    /**
     * Custom render callback for the ReadOnly value
     */
    render?: Function;
    /**
     * If set, it overrides the min-width value
     */
    width?: number;
}

export type Error = {
    error?: string;
}

export interface Options {
    variant?: string;
    noFocus?: boolean;
    rightPadding?: number;
}

const InputWrapper = styled.div<{ flexGrow?: boolean, edit?: boolean, width?: number }>`
    min-width: ${(props) => props.width ? `${props.width}px` : '350px'};
    flex-grow: ${(props) => props.edit && props.flexGrow ? 1 : 'none'};
`

const Header = styled.div`
    display: grid;
    grid-template-columns: min-content auto auto;
    padding-bottom: 2px;
    width: 100%;
    white-space: nowrap;
`

const ValidationError = styled(EdsLabel)`
    color: rgb(235, 0, 0);
    margin-top: 4px;
    height: 32px;
`

const Label = styled(EdsLabel)`
    height: 16px;

    & span {
        display: inline-flex;
        align-items: center;
        line-height: 0.750rem;
        color: #6f6f6f;
    }
`

const ComponentWrapper = styled.div<{ noFocus: boolean }>`
    background: #f7f7f7;
    box-shadow: inset 0 -1px 0 0 #6f6f6f;

    &:focus-within {
        outline: ${(props: any) => props.noFocus ? 'none' : '2px solid #007079' };
        box-shadow: ${(props: any) => props.noFocus ? 'inherit' : 'none' };;
    }
`

const Empty = styled.div`
    margin-top: 4px;
    height: 32px;
`

export const withInput = ({ variant = 'text', noFocus = false, rightPadding = 37 }: Options = {}) => <TOriginalProps extends {}>(
    Component:
        | React.ComponentClass<TOriginalProps & InputProps>
        | React.FunctionComponent<TOriginalProps & InputProps>,
) => {
    type ResultProps = TOriginalProps & InputProps;
    const Input = (props: ResultProps) => {

        const { id, value, label, tooltip, isRequired, disabled, edit, flexGrow, width } = props;
        const [validationErrors, setValidationErrors] = useState<Array<string> | undefined>(undefined)

        const state: any = useContext(ValidationStateContext);

        // const error = useSelector((state: any) => state.error);

        /**
         * If errors exist in the errorReducer, 
         * see if that error belongs to this input.
         * Before this component unloads, clear the errors
         */
        useEffect(() => {
            const values = state.validationReducer.errors?.errors;

            if (values) {
                Object.entries(values).forEach((item: [string, Array<string>], index: number) => {
                    const [key, value] = item;

                    if (key.toLowerCase() === id.toLowerCase()) {
                        setValidationErrors(value)
                    }
                })
            } else {
                setValidationErrors([])
            }
        }, [state.validationReducer.errors])

        /**
         * Reset the validation errors if input value changes
         */
        useEffect(() => {
            if (validationErrors) setValidationErrors(undefined)
        }, [value])

        return (
            <InputWrapper flexGrow={flexGrow} edit={edit} width={width}>
                <Header>
                    {label && <Label style={{ color: disabled ? 'rgba(190, 190, 190, 1)' : 'unset' }} label={label} />}
                    {tooltip && <Tooltip title={tooltip} placement="top" />}
                    {isRequired && <Label label={''} style={{ color: disabled ? 'rgba(190, 190, 190, 1)' : 'unset' }} meta={'*Required'}/>}
                </Header>

                {edit ? 
                    <ComponentWrapper noFocus={noFocus}>
                        <Component {...props} />
                    </ComponentWrapper> 
                    : <ReadOnly {...props} variant={variant} rightPadding={rightPadding} />    
                }

                {validationErrors ? validationErrors.map((validationError: string, index) => (
                    <ValidationError key={index} label={validationError} />
                )) : <Empty></Empty>}
            </InputWrapper>
        );
    };

    return Input;
};

