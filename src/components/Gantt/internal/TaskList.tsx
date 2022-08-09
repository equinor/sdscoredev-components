import React, { forwardRef, RefAttributes, useContext } from 'react';
import styled from 'styled-components';
import { Table } from '@equinor/eds-core-react';
// import { RowProps } from '../Row';
// import { StateContext } from "../DataTableStore";
// import CheckboxCell from "../plugins/Checkbox/CheckboxCell";
// import Cell from "./Cell";
// import SubrowCell from "../plugins/Subrow/SubrowCell";

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
        background: rgba(247, 247, 247, 1);
    }
    & > td {
        border: none;
        border-bottom: 1px solid rgba(220, 220, 220, 1);
        border-top: 1px solid rgba(220, 220, 220, 1);
    }
`;

type TaskListProps = {
    data?: any;
    depth?: number;
    plugins?: any;
};

const Row: React.FC<TaskListProps> = forwardRef((props, ref) => {
    const { data, plugins } = props;
    // const state: any = useContext(StateContext);

    // if (!data || !state.dataTableReducer.columns) return <></>
    return <></>;
    // return (
    // <DefaultRow role="row" ref={ref} style={getStyle && getStyle(data)}>

    //     {/* ---- Checkbox plugin implementation start --------------------------------------- */}
    //     {state.checkboxReducer && <CheckboxCell key={`checkbox-header-${data.id}`} item={data} getKey={plugins.checkbox.props.getKey} />}
    //     {/* ---- Checkbox plugin implementation end ----------------------------------------- */}

    //     {state.dataTableReducer.columns.map((column: any) => (
    //         <React.Fragment key={`${column.props.id}-${data.id}`} >
    //         {state.columnSelectorReducer && state.columnSelectorReducer.visibleColumns?.includes(column.props.id) ? (
    //                 <Cell
    //                     {...props}
    //                     column={column}
    //                     onClick={handleClick}
    //                     item={data}
    //                     href={getLink ? getLink(data) : undefined} />
    //             ) : <></>}

    //         {!state.columnSelectorReducer && !column.props.optional ? (
    //                 <Cell
    //                     {...props}
    //                     column={column}
    //                     onClick={handleClick}
    //                     item={data}
    //                     href={getLink ? getLink(data) : undefined} />
    //             ) : <></>}
    //         </React.Fragment>
    //     ))}

    //     {/* ---- Subrow plugin implementation start ---- */}
    //     {plugins.subrow && state.subrowReducer && <SubrowCell item={data} render={plugins.subrow.props.columnRender} />}
    //     {/* ---- Subrow plugin implementation end ------ */}

    // </DefaultRow>
    // );
});

export default Row;
