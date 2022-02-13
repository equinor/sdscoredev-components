import React, { forwardRef, MouseEventHandler, useContext } from "react";
import { Icon, Table } from '@equinor/eds-core-react';
import { StateContext } from "../DataTableStore";
import styled from "styled-components";

type TableHeaderCellProps = {
    column: JSX.Element;
    onClick: MouseEventHandler<HTMLTableCellElement>;
    id: string;
    width?: number;
}

const Cell = styled(Table.Cell)<{ width?: number }>`
    border-top: unset !important;

    min-width: ${(props: any) => (props.width ? `${props.width}px`  : 'unset')};

    background-image: linear-gradient(to bottom, #cfcfcf, transparent 50%);
    background-position: right top, right bottom;
    background-repeat: repeat-y;
    background-size: 1px 8px;
`;

const HeaderCell: React.FC<TableHeaderCellProps> = ({ column, onClick, id, width }) => {
    const state: any = useContext(StateContext);
    
    return (
        <Cell onClick={onClick} id={id} className="dataTableTh" width={width}>
            {column.props.children}
            {state.sortingReducer && column.props.orderBy && (
                <Icon name={state.sortingReducer.ascending ? 'chevron_up' : 'chevron_down'} />
            )}
        </Cell>
    );
}

export default HeaderCell;