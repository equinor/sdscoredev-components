import React from 'react';
import { Icon, TextField as EdsTextField, TextFieldProps } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { withInput } from './withInput';
import { PartialPick } from '../types';
import type { InputProps } from './withInput';

const StyledTextField = styled(EdsTextField)`
    input {
        padding-top: 7px;
        height: 37px;
    }
`;
export const TextField: React.FC<InputProps & PartialPick<TextFieldProps, 'unit' | 'inputRef'>> = (props: any) => {
    const { id, value, error, onChange, unit, inputRef, disabled } = props;

    return (
        <StyledTextField
            id={id}
            label=""
            disabled={disabled}
            inputRef={inputRef}
            unit={unit}
            onChange={onChange}
            value={value || ''}
            variant={error ? 'error' : 'default'}
            helperText={error}
            helperIcon={error && <Icon name="error_filled" title="Error" />}
        />
    );
};

export default withInput()(TextField);
