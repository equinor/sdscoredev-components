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
    const { id, meta, value, onChange, error, disabled } = props;

    return (
        <StyledTextField
            id={id}
            meta={meta}
            value={value || ''}
            onChange={onChange}
            variant={error ? "error" : "default"}
            helperText={error}
            helperIcon={error && <Icon name="error_filled" title="Error" />}
            disabled={disabled}
        />
    );
};

export default withInput()(TextField);
