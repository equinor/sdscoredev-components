import React, { MouseEventHandler, useContext } from "react";
import { Icon, Table } from '@equinor/eds-core-react';
import { StateContext } from "../DataTableStore";

type TableHeaderCellProps = {
    column: JSX.Element;
    onClick: MouseEventHandler<HTMLTableCellElement>;
}

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ column, onClick }) => {
    const state: any = useContext(StateContext);
    
    return (
        <Table.Cell onClick={onClick}>
            {column.props.children}
            {state.sortingReducer && column.props.orderBy && (
                <Icon name={state.sortingReducer.ascending ? 'chevron_up' : 'chevron_down'} />
            )}
        </Table.Cell>
    );
}