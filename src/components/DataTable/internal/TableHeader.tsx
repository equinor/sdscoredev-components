import React, { Children, useContext, useEffect } from "react";
import styled from 'styled-components';
import { Table } from '@equinor/eds-core-react';
import { DispatchContext, StateContext } from "../DataTableStore";
import { TableHeaderCell } from "./TableHeaderCell";

const Head = styled(Table.Head)`
    white-space: normal;
`;

export const TableHeader: React.FC = ({ children }) => {
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);

    useEffect(() => {
        dispatch({ type: 'SET_COLUMNS', payload: Children.toArray(children) });
    }, [])

    const handleClick = (orderBy: string) => {
        dispatch({ type: 'SORT', payload: orderBy });
    }
    
    return (
        <Head>
            <Table.Row>
                {state.dataTableReducer.columns?.filter((x: any) => state.dataTableReducer.visibleColumns?.includes(x.props.id)).map((column: JSX.Element) => (
                    <TableHeaderCell key={column.props.id} column={column} onClick={() => handleClick(column.props.orderBy)} />
                ))}
            </Table.Row>
        </Head>
    );
};
