/* eslint-disable no-nested-ternary */
import React from "react";
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";
import enGB from 'date-fns/locale/en-GB';
import styled from "styled-components";
import { withInput } from "./winthInput";

const RequiredLabel = styled.span`
    display: inline-flex;
    width: 100%;
    justify-content: space-between;
`;

export const Label = styled.div<{ marginTop?: number }>`
    height: 16px;
    margin-top: ${(props: any) => (props.marginTop ? `${props.marginTop}px` : '0px')};
    font-size: 0.750rem;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: #6f6f6f;
    margin-left: 8px;
    font-weight: 500;
    line-height: 1.333em;
`;

registerLocale("en-GB", enGB);
setDefaultLocale("en-GB");

const DatePickerField = (props) => {
    const { id, label, value, onChange, disabled, isRequired, dataCy } = props;

    const handleChange = (date) => {
        onChange && onChange({ target: { value: date, id }})
    }

    return (
        <div>
            <RequiredLabel {...props}>
                <Label>{label}</Label>
                {isRequired && (<Label {...props}>*Required</Label>)}
            </RequiredLabel>
            <DatePicker
                className="datePicker"
                selected={value ? new Date(value) : null}
                onChange={handleChange}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd.MM.yyyy"
                isClearable={true}
            />
        </div>
    );
}

export default withInput()(DatePickerField);