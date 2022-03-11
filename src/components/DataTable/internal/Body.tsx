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
        if (redraw.current < 3 && state.columnSelectorReducer.visibleColumns) {
            dispatch({ type: "CALCULATE_COLUMN_WIDTH", payload: state.columnSelectorReducer.visibleColumns, id })
            redraw.current++;
        }
    }, [redraw.current])

    if (!data) return <></>

    return (
        <Table.Body ref={ref} id={`dataTable.body.${id}`}>
            {data.map((item: any) => <Row {...props} data={item} ref={(el) => rowRef.current = el} key={`row-${item.id}`} />)}
        </Table.Body>
    );
});

export default Body;