import React from 'react';
import { Label as EdsLabel } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { ReadOnlyValue } from './ReadOnlyValue';
import { Tooltip } from '../../Tooltip';

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
    tooltip?: string | null;
    /**
     * Displays `* Requeried*  to the top right of the input field.
     */
    render?: Function;
    /**
     * If set, it overrides the min-width value
     */
    width?: number;
    meta?: string;
    /**
     * Type of data to be shown
     */
    variant?: 'html' | 'text';
    'data-cy'?: string;
}

const InputWrapper = styled.div<{ width?: number }>`
    min-width: ${(props) => (props.width ? `${props.width}px` : 'unset')};
    flex: ${(props) => (props.width ? 'unset' : '1')};
`;

const Header = styled.div`
    display: flex;

    padding-bottom: 2px;
    width: 100%;
    white-space: nowrap;
    justify-content: space-between;
    &:last-child {
        float: right;
    }
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

const Empty = styled.div`
    margin-top: 4px;
    height: 32px;
`;

export const ReadOnlyField: React.FC<ReadOnlyFieldProps> = (props: any) => {
    const { label, tooltip, width, meta } = props;

    return (
        <InputWrapper width={width}>
            <Header>
                <div>
                    {label && <Label label={label} />}
                    {tooltip && <Tooltip title={tooltip} placement="top" />}
                </div>
                {meta && <Label label={meta} />}
            </Header>

            <ReadOnlyValue {...props} />
            <Empty />
        </InputWrapper>
    );
};

export default ReadOnlyField;
