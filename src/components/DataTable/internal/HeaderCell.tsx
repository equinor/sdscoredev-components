import React, { MouseEventHandler, useContext } from "react";
import { Icon, Table } from '@equinor/eds-core-react';
import { StateContext } from "../DataTableStore";
import styled from "styled-components";

type TableHeaderCellProps = {
    column: JSX.Element;
    onClick: MouseEventHandler<HTMLTableCellElement>;
    id: string;
    width?: number;
}

const Cell = styled(Table.Cell)<{ width?: number, fit?: boolean }>`
    border-top: unset !important;

    min-width: ${(props: any) => (props.width ? `${props.width}px`  : 'unset')};
    white-space: ${(props: any) => (props.fit ? 'nowrap'  : 'normal')};

    background-image: linear-gradient(to bottom, #cfcfcf, transparent 50%);
    background-position: right top, right bottom;
    background-repeat: repeat-y;
    background-size: 1px 8px;
`;

const SortIcon = styled.div`
    position: relative;
`;

const HeaderCell: React.FC<TableHeaderCellProps> = ({ column, onClick, id, width }) => {
    const { fit } = column.props;
    const state: any = useContext(StateContext);

    const sortIcon = () => {
        // TODO: Remove orderBy, its deprecated
        if (!state.sortReducer || (!column.props.orderBy && !column.props.sort)) return <></>;

        if (column.props.orderBy === state.sortReducer.orderBy || column.props.sort === state.sortReducer.orderBy) {
            return <Icon size={18} name={state.sortReducer.ascending ? 'chevron_up' : 'chevron_down'} />
        } else {
            return (
                <SortIcon>
                    <Icon size={16} name='chevron_up' style={{ position: 'absolute', top: '-12px' }} />
                    <Icon size={16} name='chevron_down' style={{ position: 'absolute', bottom: '-12px' }} />
                </SortIcon>
            )
        }
    };
    
    return (
        <Cell onClick={onClick} id={id} className="dataTableTh" width={width} fit={fit}>
            {column.props.children}
            {sortIcon()}
        </Cell>
    );
}

export default HeaderCell;