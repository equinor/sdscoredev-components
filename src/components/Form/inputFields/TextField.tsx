import React from 'react';
import { Icon, TextField as EdsTextField } from '@equinor/eds-core-react';
import { InputProps, withInput, Error } from './withInput';

export const TextField: React.FC<InputProps> = (props: any) => {
    const { id, meta, value, onChange, error, disabled } = props;

    return (
        <EdsTextField
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
