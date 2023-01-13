/* eslint-disable */
import { Label as EdsLabel } from '@equinor/eds-core-react';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Tooltip } from '../../Tooltip';
import { ValidationStateContext } from '../Validation/ValidationProvider';
import { ReadOnlyValue } from './ReadOnlyValue';

export type InputProps = {
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
    defaultValue?: any;
    /**
     * Text to be shown in a tooltip.
     * Adds a question mark icon to the right of the label
     */
    tooltip?: string | null;
    /**
     * Displays `* Requeried*  to the top right of the input field.
     */
    isRequired?: boolean;
    /**
     * Callback for changes in the input
     */
    onChange?: any;
    /**
     * Callback for changes in the input on focus loss
     */
    onBlur?: any;
    /**
     * Toogles the input between edit mode and read only mode
     */
    edit?: boolean;
    /**
     * Disables a field for editing
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
    /**
     * If set, disable validation
     */
    noValidation?: boolean;
    /**
     * Placeholder text to display in an empty textField
     */
    placeholder?: string | Array<string>;
    /**
     * Defining cypress name in case of Material ui key
     */
    cyName?: string;
};

export type Error = {
    error?: string;
};

export interface Options {
    variant?: string;
    noFocus?: boolean;
    rightPadding?: number;
    noWrapper?: boolean;
    noLabel?: boolean;
}

const InputWrapper = styled.div<{
    flexGrow?: boolean;
    edit?: boolean;
    width?: number;
}>`
    min-width: ${(props) => (props.width ? `${props.width}px` : '350px')};
    /* flex-grow: ${(props) => (props.flexGrow ? 1 : 0)}; */
`;

const Header = styled.div`
    display: grid;
    grid-template-columns: min-content auto min-content;
    padding-bottom: 2px;
    width: 100%;
    white-space: nowrap;
`;

const ValidationError = styled(EdsLabel)`
    color: rgb(235, 0, 0);
    margin-top: 4px;
    height: 32px;
`;

const Label = styled(EdsLabel)`
    height: 16px;

    & span {
        display: inline-flex;
        align-items: center;
        line-height: 0.75rem;
        color: #6f6f6f;
    }
`;

const ComponentWrapper = styled.div<{ noFocus: boolean }>`
    color: rgba(61, 61, 61, 1);
    background: #f7f7f7;
    box-shadow: inset 0 -1px 0 0 #6f6f6f;

    &:focus-within {
        outline: ${(props: any) => (props.noFocus ? 'none' : '2px solid #007079')};
        box-shadow: ${(props: any) => (props.noFocus ? 'inherit' : 'none')};

        & > * {
            box-shadow: ${(props: any) => (props.noFocus ? 'inherit' : 'none')};
        }
    }
`;

const DisabledComponentWrapper = styled.div`
    color: rgba(190, 190, 190, 1);
    background: #f7f7f7;
`;

const Empty = styled.div`
    margin-top: 4px;
    height: 32px;
`;

export const withInput =
    ({ variant = 'text', noFocus = false, rightPadding = 0, noWrapper = false, noLabel = false }: Options = {}) =>
    <TOriginalProps extends {}>(
        Component:
            | React.ComponentClass<TOriginalProps & InputProps>
            | React.FunctionComponent<TOriginalProps & InputProps>,
    ) => {
        type ResultProps = TOriginalProps & InputProps;
        const Input = (props: ResultProps) => {
            const { id, value, label, tooltip, isRequired, disabled, edit, flexGrow, width, noValidation, cyName } = props;
            const [validationErrors, setValidationErrors] = useState<Array<string> | undefined>(undefined);

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
                            setValidationErrors(value);
                        }
                    });
                } else {
                    setValidationErrors(undefined);
                }
            }, [state.validationReducer.errors]);

            /**
             * Reset the validation errors if input value changes
             */
            useEffect(() => {
                if (validationErrors) setValidationErrors(undefined);
            }, [value]);

            const Validation = () => {
                if (validationErrors) {
                    return (
                        <>
                            {validationErrors.map((validationError: string, index: number) => (
                                <ValidationError key={index} label={validationError} />
                            ))}
                        </>
                    );
                } else {
                    return <Empty></Empty>;
                }
            };

            return (
                <InputWrapper flexGrow={flexGrow} edit={edit} width={width} data-cy={`Input-${cyName ? cyName : id.replace('.', '_')}`}>
                    {!noLabel && (
                        <Header data-cy={`Input-Header-${id}`}>
                            {label && (
                                <Label
                                    style={{
                                        color: disabled ? 'rgba(190, 190, 190, 1)' : 'unset',
                                    }}
                                    label={label}
                                />
                            )}
                            {tooltip && <Tooltip title={tooltip} placement="top" />}
                            {isRequired && (
                                <Label
                                    label={''}
                                    style={{
                                        color: disabled ? 'rgba(190, 190, 190, 1)' : 'unset',
                                    }}
                                    meta={'*Required'}
                                />
                            )}
                        </Header>
                    )}

                    {edit && !noWrapper && !disabled && (
                        <ComponentWrapper noFocus={noFocus}>
                            <Component {...props} />
                        </ComponentWrapper>
                    )}

                    {edit && !noWrapper && disabled && (
                        <DisabledComponentWrapper>
                            <Component {...props} />
                        </DisabledComponentWrapper>
                    )}

                    {edit && noWrapper && <Component {...props} />}

                    {!edit && (
                        <ReadOnlyValue
                            {...props}
                            variant={variant}
                            rightPadding={rightPadding}
                            data-cy={`Input-ReadOnly-${id}`}
                        />
                    )}

                    {!noValidation && <Validation data-cy={`Input-Validation-${id}`} />}
                </InputWrapper>
            );
        };

        return Input;
    };
