import React from 'react';
import { Icon, TextField as EdsTextField } from '@equinor/eds-core-react';
import { InputProps, withInput, Error } from './withInput';


const TextField: React.FC<InputProps> = (props: any) => {
    const { id, label, meta, value, onChange, error, tooltip } = props;

    console.log('TextField', props)

    return (
        <EdsTextField
            id={id}
            meta={meta}
            value={value}
            onChange={onChange}
            variant={error ? "error" : "default"}
            helperText={error}
            helperIcon={error && <Icon name="error_filled" title="Error" />}
        />
    );
};

export default withInput()(TextField);
