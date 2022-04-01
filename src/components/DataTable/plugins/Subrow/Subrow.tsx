import React, { useContext } from 'react';
import { SubrowProps } from './index';
import { DispatchContext } from '../../DataTableStore';
import styled from 'styled-components';
import { Table } from '@equinor/eds-core-react';

export type InternalSubrowProps = {
    data?: any;
};

const DefaultRow = styled(Table.Row)`
    & > td {
        border: none;
        border-bottom: 1px solid rgba(220, 220, 220, 1);

        &:first-child {
            border-left: 1px solid rgba(220, 220, 220, 1);
        }

        &:last-child {
            border-right: 1px solid rgba(220, 220, 220, 1);
        }
    }
`

const StyledCell = styled(Table.Cell)`
    background: rgba(247,247,247,1);
    padding-bottom: 16px;

    & div {
        margin-left: 0 !important;
    }
`;

export const Subrow: React.FC<InternalSubrowProps & SubrowProps> = (props) => {
    const { columnRender, render, data } = props;
    const dispatch: any = useContext(DispatchContext);

    const getCellCount = () => {
        const elements = document.getElementsByClassName('dataTableTh')
        return elements.length
    }

    return (
        <DefaultRow role="row">
            <StyledCell colSpan={getCellCount()}>{render({ data })}</StyledCell>
        </DefaultRow>
    )
}
