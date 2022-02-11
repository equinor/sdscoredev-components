import React, { useContext, useEffect } from "react";
import { Table } from '@equinor/eds-core-react';
import { TableRow } from './TableRow';
import { DispatchContext, StateContext } from "../DataTableStore";

type TableBodyProps = {
    data?: any;
    onFetch?: Function;
}
export const TableBody: React.FC<TableBodyProps> = (props) => {
    const { data, onFetch } = props;
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);

    useEffect(() => {
        data && dispatch({ type: 'SET_DATA', payload: data });
    }, [data])


    // TODO: if query is undefined dont do onFetch, but make sure it fetches if dataTableReducer.query has been updated
    useEffect(() => {
        // const params = new URLSearchParams(window.location.search);
        // let filterQuery = new FilterParser(params, { logging: false, defaultPagination: '0,10' }).parse();
        // dispatch({ type: "SET_QUERY", payload: filterQuery })
        if (typeof state.dataTableReducer.query !== 'undefined') {
            onFetch && onFetch(state.dataTableReducer.query);
        }
    }, [state.dataTableReducer.query])

    return (
        <Table.Body>
            {data?.map((item: any) => (
                <TableRow {...props} key={`row-${item.id}`} data={item} />
            ))}
        </Table.Body>
    );
};
