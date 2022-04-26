import React from 'react';
import { Label as EdsLabel } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { ReadOnlyValue } from './ReadOnlyValue';
import { Tooltip } from 'components/Tooltip';

export interface ReadOnlyFieldProps {
    /**
     * Label that will be displayed above the input field
     */
    label?: string;
    /**
     * TODO: Not used yet
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
    render?: Function;
    /**
     * If set, it overrides the min-width value
     */
    width?: number;
    /**
     * Type of data to be shown
     */
    variant?: 'html' | 'text';
}

const InputWrapper = styled.div<{ width?: number }>`
    min-width: ${(props) => props.width ? `${props.width}px` : '350px'};
`

const Header = styled.div`
    display: grid;
    grid-template-columns: min-content auto auto;
    padding-bottom: 2px;
    width: 100%;
    white-space: nowrap;
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

export const ReadOnlyField: React.FC<ReadOnlyFieldProps> = (props: any) => {
    const { label, tooltip, width } = props;

    return (
        <InputWrapper width={width}>
            <Header>
                {label && <Label label={label} />}
                {tooltip && <Tooltip title={tooltip} placement="top" />}
            </Header>

            <ReadOnlyValue {...props} />    
        </InputWrapper>
    );
};

export default ReadOnlyField;
