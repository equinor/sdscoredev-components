import React, { forwardRef, RefAttributes, useContext } from "react";
import styled from 'styled-components';
import { Table } from '@equinor/eds-core-react';
import { RowProps } from '../Row';
import { StateContext } from "../DataTableStore";
import CheckboxCell from "./CheckboxCell";
import Cell from "./Cell";

const DefaultRow = styled(Table.Row)`
    display: table-row;
    vertical-align: middle;
    text-decoration: none;

    background-image: linear-gradient(to bottom, #cfcfcf, transparent 50%);
    background-position: left top, left bottom;
    background-repeat: repeat-y;
    background-size: 1px 8px;

    &:hover {
        cursor: pointer;
        background: rgba(234,234,234,1);
    }
    & > td {
        border: none;
        border-bottom: 1px solid rgba(220, 220, 220, 1);
        border-top: 1px solid rgba(220, 220, 220, 1);
    }
`

type TableRowProps = {
    data?: any;
}

const Row: React.FC<TableRowProps & RowProps & RefAttributes<HTMLTableRowElement>> = forwardRef((props, ref) => {
    const { data, onClick, getLink, getStyle } = props;
    const state: any = useContext(StateContext);

    const handleClick = (e: any) => {
        e.preventDefault();

        if (getLink) {
            onClick && onClick(getLink(data))
        }
       
        onClick && onClick()
    }

    if (!data || !state.dataTableReducer.columns) return <></>

    return (
        <DefaultRow role="row" ref={ref} style={getStyle && getStyle(data)}>
            {state.checkboxReducer &&
                <CheckboxCell key={`checkbox-header-${data.id}`} item={data}/>
            }

            {state.dataTableReducer.columns.map((column: any) => (
                <React.Fragment key={`${column.props.id}-${data.id}`} >
                {state.columnSelectorReducer.visibleColumns?.includes(column.props.id) ? (
                        <Cell 
                            {...props}
                            column={column}
                            onClick={handleClick}
                            item={data}
                            href={getLink ? getLink(data) : undefined} />
                    ) : <></>}
                </React.Fragment>
            ))}
        </DefaultRow>
    );
});

export default Row;
