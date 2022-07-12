import React, { useContext } from 'react';
import styled from 'styled-components';

import { Table } from '@equinor/eds-core-react';

import { DispatchContext, StateContext } from '../../DataTableStore';

type SubrowCellProps = {
    item: any;
    render: Function;
};

const Cell = styled(Table.Cell)`
    border-top: unset !important;
    width: 1%;
    padding: 0 8px;

    background-image: linear-gradient(to bottom, #cfcfcf, transparent 50%);
    background-position: right top, right bottom;
    background-repeat: repeat-y;
    background-size: 1px 8px;

    & div {
        margin-left: 0 !important;
    }
`;

const SubrowCell: React.FC<SubrowCellProps> = ({ item, render }) => {
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);

    const onClick = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch({ type: 'SUBROW_TOGGLE', payload: item.id });
    };

    const isOpen = () => state.subrowReducer.open.includes(item.id);

    return <Cell>{render({ item, onClick, open: isOpen() })}</Cell>;
};

export default SubrowCell;
