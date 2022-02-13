import React, { forwardRef, RefAttributes, useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import { CellProps, Table } from '@equinor/eds-core-react';
import { RowProps } from '../types';
import { DispatchContext, StateContext } from "../DataTableStore";
import CheckboxCell from "./CheckboxCell";

const AnchorRow = styled.a`
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

const Cell = styled(Table.Cell)<CellProps & { slim?: boolean}>`
    border-top: unset !important;
    background-image: linear-gradient(to bottom, #cfcfcf, transparent 50%);
    background-position: right top, right bottom;
    background-repeat: repeat-y;
    background-size: 1px 8px;

    width: ${(props: any) => (props.slim ? '1%' : 'unset')};

    & div {
        margin-left: 0 !important;
    }

    &:hover {
        & div.truncated-cell {
            overflow: visible;
            z-index: 66;

            span {
                background: rgba(234, 234, 234, 1);

                div {
                    display: block;
                }
            }
        }
    }
`;

type TableRowProps = {
    data?: any;
}

const Row: React.FC<TableRowProps & RowProps & RefAttributes<HTMLTableRowElement>> = forwardRef((props, ref) => {
    const state: any = useContext(StateContext);
    const [cells, setCells] = useState<Array<JSX.Element>>([]);
    
    useEffect(() => {
        if (props.data) {
            const result: Array<JSX.Element> = [];

            if (state.checkboxReducer) {
                result.push(<CheckboxCell key="checkbox-header" item={props.data}/>)
            }
            
            state.dataTableReducer.columns?.forEach((column: any) => {
                if (state.columnSelectorReducer.visibleColumns?.includes(column.props.id)) {
                    result.push(
                        <Cell slim={column.props.slim} key={`${column.props.id}-${props.data.id}`} scope="col" id={column.props.id}>
                            {props.data[column.props.id]}
                        </Cell>
                    )
                }
            });

            setCells(result)
        }
    }, [props.data])

    if (!cells.length) return <></>

    if (props.getLink) {
        return (
            <AnchorRow role="row" href={props.getLink(props.data)}>
                {cells}
            </AnchorRow>
        );
    }

    return (
        <DefaultRow role="row" ref={ref}>
            {cells}
        </DefaultRow>
    );
});

export default Row;
