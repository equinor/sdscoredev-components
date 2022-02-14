import React, { forwardRef, useContext, useEffect, useRef } from "react";
import { Table } from '@equinor/eds-core-react';
import Row from './Row';
import { DispatchContext, StateContext } from "../DataTableStore";

type TableBodyProps = {
    data?: any;
    onFetch?: Function;
    children?: any;
}
const Body = forwardRef<HTMLTableSectionElement, TableBodyProps>((props: TableBodyProps, ref) => {
    const { data, onFetch } = props;
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);
    const rowRef = useRef<any>(null)

    /**
     * Initialize data so that we can draw the table rows
     */
    useEffect(() => {
        data && dispatch({ type: 'SET_DATA', payload: data });
    }, [data])

    useEffect(() => {
        if (typeof state.dataTableReducer.query !== 'undefined') {
            onFetch && onFetch(state.dataTableReducer.query);
        }
    }, [state.dataTableReducer.query])

    useEffect(() => {
        dispatch({ type: "CALCULATE_COLUMN_WIDTH", payload: state.columnSelectorReducer.visibleColumns })
    }, [rowRef.current])

    if (!data) return <></>

    return (
        <Table.Body ref={ref} id="dataTable.body">
            {data.map((item: any) => {
                return (
                    <Row {...props} key={`row-${item.id}`} data={item} ref={(el) => rowRef.current = el} />
                )
            })}
        </Table.Body>
    );
});

export default Body;