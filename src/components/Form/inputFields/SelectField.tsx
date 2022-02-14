import React from 'react';
import Select from 'react-select';
import { InputProps, withInput, Error } from './withInput';

type SelectFieldProps = {
    options?: Array<any>;
    isDisabled?: boolean;
    getOptionLabel?: Function;
};

const SelectField: React.FC<SelectFieldProps & InputProps & Error> = (props) => {
    const { id, label, meta, value, isRequired, isDisabled, onChange, options, error } = props;
    const filterOption = ({ label }: any, input: any) => (label !== null && label !== undefined) && label.toLowerCase().includes(input.toLowerCase());

    const handleChange = (value: any) => {
        const e = { target: { value: value.id, id }};
        onChange && onChange(e);
    }

    return (
        <Select
            id={id}
            options={options}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            value={options && options.filter((x) => x.id === value)}
            onChange={handleChange}
            // placeholder={placeholder}
            isDisabled={isDisabled}
            // theme={(theme: any) => equinorTheme(theme)}
            styles={{
                // Fixes the overlapping problem of the component
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
                menuPortal: (provided) => ({ ...provided, zIndex: 9999 })
            }}
            filterOption={filterOption}
            isClearable={true}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            // menuIsOpen
        />
    );
}

export default withInput()(SelectField);
