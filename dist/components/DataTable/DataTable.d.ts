import React from "react";
export declare type DataTableProps = {
    /**
     * Data to be displayed in table
     * @default {}
     */
    data?: any;
    /**
     * Callback to define the path to the actual array of data.
     *
     * If data from api looks like this:
     * ```
     * { items: [{..}, {..}, ...], meta: { page: 1, count: 365 } }
     * ```
     * Then this param can be used like this:
     * ```
     * <DataTable getData={(data) => data.items} ... />
     * ```
     * If param is not used, DataTable presume the data is an `Array` with objects
     * @default
     */
    getData?: Function;
    /**
     * Object containing additional reducers (plugins) to be used. They will be handled as reducer slices
     * and will manipulate the DataTable root state, as well as it's own separate states.
     *
     * `dataTableReducer` is the default reducer that will always be the root state, this reducer is automatically added.
     *
     * Most common reducer to add is `paginationReducer`. It will add `pageSize` and `pageIndex` as state params.
     */
    reducers?: any;
    /**
     * Callback for fetching data from API
     */
    onFetch?: Function;
    /**
     * Provide caching of state to localStorage. If set, plugins will try get and set values in localStorage
     * @default false
     */
    cache?: boolean;
    onScroll?: Function;
    children?: any;
};
export declare type TableRef = {
    handleResize: Function;
} | null;
export declare const DataTable: React.ForwardRefExoticComponent<DataTableProps & React.RefAttributes<TableRef>>;
