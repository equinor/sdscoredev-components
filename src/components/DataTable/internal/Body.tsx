import React, { forwardRef, useContext, useEffect, useRef } from "react";
import { Table } from '@equinor/eds-core-react';
import Row from './Row';
import { DispatchContext, StateContext } from "../DataTableStore";

type TableBodyProps = {
    data?: any;
    onFetch?: Function;
    children?: any;
    id?: string;
}

/**
 * TODO: Needs to be split in two separate Body components, One default, and one for the Tree plugin
 */
const Body = forwardRef<HTMLTableSectionElement, TableBodyProps>((props: TableBodyProps, ref) => {
    const { data, onFetch, id } = props;
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);
    const rowRef = useRef<any>(null)
    const redraw = useRef<number>(0)

    /**
     * Initialize data so that we can draw the table rows
     */
    useEffect(() => {
        data && dispatch({ type: 'SET_DATA', payload: data });
    }, [data])

    useEffect(() => {
        onFetch && onFetch(state.dataTableReducer.query)
    }, [])

    useEffect(() => {
        if (typeof state.dataTableReducer.query !== 'undefined') {
            onFetch && onFetch(state.dataTableReducer.query);
        }
    }, [state.dataTableReducer.query])

    useEffect(() => {
        if (redraw.current < 3 && state.columnSelectorReducer && state.columnSelectorReducer.visibleColumns) {
            dispatch({ type: "CALCULATE_COLUMN_WIDTH", payload: state.columnSelectorReducer.visibleColumns, id })
            redraw.current++;
        }
    }, [redraw.current])

    /** 
     * Provides rows recursively for tree rows that is open and has children 
     */
    const generateRows = (items: any, depth: number | undefined = undefined) => {
        typeof depth == 'number' ? depth++ : depth = 0;

        return items.map((item: any, index: number) => 
        (
            <React.Fragment key={index}>
                <Row {...props} depth={depth} data={item} ref={(el) => rowRef.current = el} key={`row-${item.id}`} />
                {item.children && state.treeReducer && state.treeReducer.open.includes(item.id) && generateRows(item.children, depth)}
            </React.Fragment>
        ))
    }

    if (!data) return <></>

    return (
        <Table.Body ref={ref} id={`dataTable.body.${id}`}>
            {generateRows(data)}
        </Table.Body>
    );
});

export default Body;