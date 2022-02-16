import React, { forwardRef, RefAttributes, useContext } from "react";
import styled from 'styled-components';
import { CellProps, Table } from '@equinor/eds-core-react';
import { RowProps } from '../types';
import { StateContext } from "../DataTableStore";
import CheckboxCell from "./CheckboxCell";

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

    position: relative;

    width: ${(props: any) => (props.slim ? '1%' : 'unset')};

    & div {
        margin-left: 0 !important;
    }

    & a {
        text-decoration: none;
        color: inherit;
    }

    & a::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
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

    const handleClick = (e: any) => {
        e.preventDefault();

        if (props.getLink) {
            props.onClick && props.onClick(props.getLink(props.data))
        }
       
        props.onClick && props.onClick()
    }

    if (!props.data) return <></>

    return (
        <DefaultRow role="row" ref={ref}>
            {state.checkboxReducer &&
                <CheckboxCell key="checkbox-header" item={props.data}/>
            }

            {state.dataTableReducer.columns?.map((column: any) => {
                if (state.columnSelectorReducer.visibleColumns?.includes(column.props.id)) {
                    return (
                        <Cell 
                            slim={column.props.slim} 
                            key={`${column.props.id}-${props.data.id}`} 
                            scope="col" 
                            id={column.props.id}
                            onClick={handleClick}
                        >
                            {props.getLink ? <a href={props.getLink(props.data)}>{props.data[column.props.id]}</a> : props.data[column.props.id]}
                        </Cell>
                    )
                } else {
                    return <></>
                }
            })}
        </DefaultRow>
    );
});

export default Row;
