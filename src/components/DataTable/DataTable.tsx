import React, { Children, useEffect } from "react";
import { TableHeader } from './internal/TableHeader';
import { TableBody } from './internal/TableBody';
import { Table } from '@equinor/eds-core-react';
import { ColumnSelector } from "./ColumnSelector/ColumnSelector";
import { Pagination } from "./Pagination/Pagination";
import { DataTableStore } from "./DataTableStore";
import { dataTableReducer } from "./reducers/dataTableReducer";
import styled from "styled-components";
import { Filter } from "./Filter/Filter";
import { TableToolbar } from "./internal/TableToolbar";

const Wrapper = styled.div`
    /* overflow-x: auto; */
    white-space: nowrap;
    display: block;
`;

const TableWrapper = styled.div`
    overflow-x: auto;
`

export type DataTableProps = {
    /**
     * Data to be displayed in table
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
     */
    cache?: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({ data, getData, children, reducers, onFetch, cache }) => {
    const components = Children.toArray(children);

    const row: any = components.find((x: any) => x.type.name === 'Row');
    const pagination: any = components.find((x: JSX.Element) => x.type.name === 'Pagination');
    const columnSelector: any = components.find((x: JSX.Element) => x.type.name === 'ColumnSelector');
    const filter: any = components.find((x: JSX.Element) => x.type.name === 'Filter');
    
    return (
        <DataTableStore reducers={{ dataTableReducer, ...reducers}}>
            <Wrapper>

                <TableToolbar>
                    {columnSelector && <ColumnSelector {...columnSelector.props} cache={cache} />}
                    {filter && <Filter {...filter.props} />}
                </TableToolbar>

                <TableWrapper>
                    <Table style={{ width: '100%' }}>
                        <TableHeader >
                            {components.filter((x: any) => x.type.name === 'Column')}
                        </TableHeader>

                        <TableBody 
                            {...row?.props} 
                            data={data && getData ? getData(data) : data} 
                            onFetch={onFetch} 
                        />

                    </Table>
                </TableWrapper>

                {pagination && <Pagination count={pagination.props.getCount(data || 0)} />}

            </Wrapper>
        </DataTableStore>
    );
}
