import React, { Children, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import Header from './internal/Header';
import Body from './internal/Body';
import { Table } from '@equinor/eds-core-react';
import { ColumnSelector } from "./ColumnSelector/ColumnSelector";
import { Pagination } from "./Pagination/Pagination";
import { DataTableStore } from "./DataTableStore";
import { dataTableReducer } from "./reducers/dataTableReducer";
import styled from "styled-components";
import { Filter } from "./Filter/Filter";
import Toolbar from "./internal/Toolbar";
import { columnSelectorReducer } from "./ColumnSelector/columnSelectorReducer";
import { makeId } from "../utils";
import { StickyHeader } from "./StickyHeader/StickyHeader";

const Wrapper = styled.div`
    /* overflow-x: auto; */
    white-space: nowrap;
    display: block;
`;

const TableWrapper = styled.div<any>`
    overflow-x: auto;
    clip-path: inset(0 0 0 0);
`

export type DataTableProps = {
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
}

export type TableRef = {
    handleResize: Function;
  } | null;

export const DataTable = forwardRef<TableRef, DataTableProps>((props: DataTableProps, ref) => {
    const { 
        data = [], 
        getData, 
        children, 
        reducers = [], 
        onFetch, 
        cache = false, 
        onScroll 
    } = props;
    const components = Children.toArray(children);
    const wrapperRef = useRef<any>(null);

    const row: any = components.find((x: any) => x.type.displayName === 'DataTable.Row');
    const filter: any = components.find((x: JSX.Element) => x.type.displayName === 'DataTable.Filter');
    const pagination: any = components.find((x: JSX.Element) => x.type.displayName === 'DataTable.Pagination');
    const stickyHeader: any = components.find((x: JSX.Element) => x.type.displayName === 'DataTable.StickyHeader');
    const columnSelector: any = components.find((x: JSX.Element) => x.type.displayName === 'DataTable.ColumnSelector');

    const id = makeId()

    /**
     * Add scroll event handler to the table wrapper. It is the wrapper that gets a horizontal scrollbar
     * when table overflows.
     */
    useEffect((): any => {
        const wrapperReference = wrapperRef.current
        const handleScroll = () => onScroll && onScroll()
        wrapperReference.addEventListener('scroll', handleScroll);
        return () => wrapperReference.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
        <DataTableStore reducers={{ dataTableReducer, columnSelectorReducer, ...reducers}}>
            <Wrapper>

                <Toolbar>
                    {columnSelector && <ColumnSelector {...columnSelector.props} cache={cache} />}
                    {filter && <Filter {...filter.props} />}
                </Toolbar>

                <TableWrapper ref={wrapperRef}>

                    {stickyHeader && <StickyHeader {...stickyHeader.props} id={id} ref={stickyHeader.ref} />}

                    <Table style={{ width: '100%' }}>
                        <Header id={id}>
                            {components.filter((x: any) => x.type.displayName === 'DataTable.Column')}
                        </Header>

                        <Body
                            id={id}
                            {...row?.props} 
                            data={data && getData ? getData(data) : data} 
                            onFetch={onFetch}
                        />

                    </Table>
                </TableWrapper>

                {pagination && <Pagination count={pagination.props.getCount(data || 0)} {...pagination.props} />}

            </Wrapper>
        </DataTableStore>
    );
})
