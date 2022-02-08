import React, { useContext, useEffect } from "react";
import { Table } from '@equinor/eds-core-react';
import { TableRow } from './TableRow';
// import { StateContext } from "../DataTableStore";
import FilterParser from "../ODataQuery/parser";
import { useLocation } from "react-router-dom";
import { StateContext } from "../DataTableStore";

type TableBodyProps = {
    data?: any;
    onFetch?: Function;
}
export const TableBody: React.FC<TableBodyProps> = (props) => {
    const { data, onFetch } = props;
    const state: any = useContext(StateContext);
    const location = useLocation();
    // const dispatch: any = useContext(DispatchContext);

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
