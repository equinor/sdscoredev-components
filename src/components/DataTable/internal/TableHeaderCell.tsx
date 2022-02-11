import React, { MouseEventHandler, useContext } from "react";
import { Icon, Table } from '@equinor/eds-core-react';
import { StateContext } from "../DataTableStore";
import styled from "styled-components";

type TableHeaderCellProps = {
    column: JSX.Element;
    onClick: MouseEventHandler<HTMLTableCellElement>;
}

const Cell = styled(Table.Cell)`
    border-top: unset !important;

    background-image: linear-gradient(to bottom, #cfcfcf, transparent 50%);
    background-position: right top, right bottom;
    background-repeat: repeat-y;
    background-size: 1px 8px;
`;

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ column, onClick }) => {
    const state: any = useContext(StateContext);
    
    return (
        <Cell onClick={onClick}>
            {column.props.children}
            {state.sortingReducer && column.props.orderBy && (
                <Icon name={state.sortingReducer.ascending ? 'chevron_up' : 'chevron_down'} />
            )}
        </Cell>
    );
}