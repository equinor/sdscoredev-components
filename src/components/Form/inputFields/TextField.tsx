import React from 'react';
import { Icon, TextField as EdsTextField, TextFieldProps } from '@equinor/eds-core-react';
import { InputProps, withInput } from './withInput';
import styled from 'styled-components';
import { PartialPick } from '../types';

const StyledTextField = styled(EdsTextField)`
    input {
        padding-top: 7px;
        height: 37px;
    }
`;
export const TextField: React.FC<InputProps & PartialPick<TextFieldProps, 'unit'>> = (props: any) => {
    const { id, value, error, onChange, unit, defaultValue } = props;

    return (
        <StyledTextField
            id={id}
            label=""
            unit={unit}
            onChange={onChange}
            value={value || undefined}
            defaultValue={defaultValue || ''}
            variant={error ? 'error' : 'default'}
            helperText={error}
            helperIcon={error && <Icon name="error_filled" title="Error" />}
        />
    );
};

export default withInput()(TextField);
