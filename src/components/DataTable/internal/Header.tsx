import React, { Children, useContext, useEffect } from "react";
import styled from 'styled-components';
import { Table } from '@equinor/eds-core-react';
import { DispatchContext, StateContext } from "../DataTableStore";
import HeaderCell from "./HeaderCell";
import CheckboxHeaderCell from '../plugins/Checkbox/CheckboxHeaderCell';
import { ColumnProps } from "../Column";

const Head = styled(Table.Head)`
    white-space: normal;
`;

type HeaderProps = {
    id: string;
}

const Header: React.FC<HeaderProps> = ({ children, id }) => {
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);

    useEffect(() => {
        const columns = Children.toArray(children).map((x: JSX.Element) => {
            if (state.dataTableReducer.pluginColumnProps) {
                const pluginProps = state.dataTableReducer.pluginColumnProps[x.props.id]

                /* If the id of the Column in prop exist in the pluginColumnProps object as a key,
                then we want to manipulate the props of that column. 
                `pluginColumnProps` can be set by plugins. */
                if (pluginProps) {
                    return (<x.type {...x.props} {...pluginProps} />)
                } 
            }
            
            return x  
        })

        dispatch({ type: 'SET_COLUMNS', payload: columns });
    }, [state.dataTableReducer.pluginColumnProps])

    const handleClick = (columnProps: ColumnProps) => {
        if (columnProps.sort) {
            typeof columnProps.sort === 'boolean' ? dispatch({ type: 'SORT', payload: columnProps.id }) : dispatch({ type: 'SORT', payload: columnProps.sort });
            // TODO: Deprecated, should be removed
        } else if (columnProps.orderBy) {
            dispatch({ type: 'SORT', payload: columnProps.orderBy });
        }
    }

    if (!state.dataTableReducer.columns) return <></>
    
    return (
        <Head>
            <Table.Row id={`dataTable.headerRow.${id}`}>
                {state.checkboxReducer && (
                    <CheckboxHeaderCell key="checkbox-header" />
                )}

                {state.columnSelectorReducer && state.dataTableReducer.columns?.
                    filter((x: any) => state.columnSelectorReducer.visibleColumns?.includes(x.props.id)).
                    map((column: JSX.Element) => (
                        <HeaderCell key={column.props.id} id={column.props.id} column={column} onClick={() => handleClick(column.props)} />
                    ))
                }

                {!state.columnSelectorReducer && state.dataTableReducer.columns?.
                    filter((x: any) => !x.props.optional).
                    map((column: JSX.Element) => (
                        <HeaderCell key={column.props.id} id={column.props.id} column={column} onClick={() => handleClick(column.props.orderBy)} />
                    ))
                }
            </Table.Row>
        </Head>
    );
};

export default Header;
