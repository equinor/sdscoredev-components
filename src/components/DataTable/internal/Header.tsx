import React, { Children, useContext, useEffect } from "react";
import styled from 'styled-components';
import { Table } from '@equinor/eds-core-react';
import { DispatchContext, StateContext } from "../DataTableStore";
import HeaderCell from "./HeaderCell";
import CheckboxHeaderCell from './CheckboxHeaderCell';

const Head = styled(Table.Head)`
    white-space: normal;
`;

const Header: React.FC = ({ children }) => {
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);

    useEffect(() => {
        dispatch({ type: 'SET_COLUMNS', payload: Children.toArray(children) });
    }, [])

    const handleClick = (orderBy: string) => {
        dispatch({ type: 'SORT', payload: orderBy });
    }

    if (!state.dataTableReducer.columns) return <></>
    
    return (
        <Head>
            <Table.Row id="dataTable.headerRow">
                {state.checkboxReducer && (
                    <CheckboxHeaderCell key="checkbox-header" />
                )}

                {state.dataTableReducer.columns?.filter((x: any) => state.columnSelectorReducer.visibleColumns?.includes(x.props.id)).map((column: JSX.Element) => (
                    <HeaderCell key={column.props.id} id={column.props.id} column={column} onClick={() => handleClick(column.props.orderBy)} />
                ))}
            </Table.Row>
        </Head>
    );
};

export default Header;
