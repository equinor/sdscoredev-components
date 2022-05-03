import React from 'react';
import { Icon, TextField as EdsTextField } from '@equinor/eds-core-react';
import { InputProps, withInput } from './withInput';
import styled from 'styled-components';

const StyledTextField = styled(EdsTextField)`
    input {
        padding-top: 7px;
        height: 37px;
    }
`
export const TextField: React.FC<InputProps> = (props: any) => {
    const { id, meta, value, onChange, error, disabled, onBlur, placeholder } = props;

    return (
        <StyledTextField
            id={id}
            meta={meta}
            defaultValue={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            variant={error ? "error" : "default"}
            helperText={error}
            helperIcon={error && <Icon name="error_filled" title="Error" />}
            disabled={disabled}
            placeholder={placeholder}
        />
    );
};

export default withInput()(TextField);
