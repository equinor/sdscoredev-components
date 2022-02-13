import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from "react";
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
     * Provides context with current column widths, so that sticky header can sync
     */
    const calculateColumnWidths = () => {
        if (rowRef.current) {
            const payload = {}
            Array.from(rowRef.current.children).forEach((child: any) => {
                payload[child.id] = child.getBoundingClientRect().width - 32 // TODO: Must not use hard coded value
            })
            dispatch({ type: 'SET_WIDTH', payload });
        }
    }

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

    /**
     * When rowRef updates, call function to calculate column widths of the last rendered row
     */
    useEffect(() => calculateColumnWidths(), [rowRef.current])

    /**
     * Initializes recalculate function to be called on this component ref
     */
    useImperativeHandle(ref, (): any => ({
        calculate: () => calculateColumnWidths()
    }));

    if (!data) return <></>

    return (
        <Table.Body ref={ref}>
            {data.map((item: any) => {
                return (
                    <Row {...props} key={`row-${item.id}`} data={item} ref={(el) => rowRef.current = el} />
                )
            })}
        </Table.Body>
    );
});

export default Body;