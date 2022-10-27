import React, { Children, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { EdsProvider, Table } from '@equinor/eds-core-react';

import { getDataProps, makeId } from '../utils';
import { DataTableStore } from './DataTableStore';
import Body from './internal/Body';
import Header from './internal/Header';
import Toolbar from './internal/Toolbar';
import { Checkbox } from './plugins/Checkbox/Checkbox';
import { ColumnSelector } from './plugins/ColumnSelector/ColumnSelector';
import { Export } from './plugins/Export/Export';
import { Filter } from './plugins/Filter/Filter';
import { Pagination } from './plugins/Pagination/Pagination';
import { Sort } from './plugins/Sort/Sort';
import { StickyHeader } from './plugins/StickyHeader/StickyHeader';
import { Tree } from './plugins/Tree/Tree';
import { dataTableReducer } from './reducers/dataTableReducer';

const Wrapper = styled.div<{ width?: number }>`
    max-width: ${(props) => (props.width ? `${props.width}px` : '100%')};
    width: ${(props) => (!props.width ? '100%' : 'unset')};
    white-space: nowrap;
    display: inline-block;
`;

const TableWrapper = styled.div<any>`
    overflow-x: auto;
    clip-path: inset(0 0 0 0);
    padding-bottom: 16px;
`;

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
     * Callback for fetching data from API. If not used,
     * sorting will be applied on the frontend
     */
    onFetch?: Function;
    /**
     * Callback for when page is scrolling
     */
    onScroll?: Function;
    /**
     * Makes the table compact
     */
    compact?: boolean;
    /**
     * Use native Eds-sticky header
     */
    nativeSticky?: boolean;
    /**
     * Sets the maximum width of table
     */
    width?: number;
    /**
     * Contains the children of the DataTable
     */
    children?: any;
    /**
     * Exposes the toolbar DOM, so that you can place it elsewhere
     *
     * example:
     * ```
     * toolbarDOM={(dom: any) => document.getElementById('gantt-toolbar')?.append(dom)}
     * ```
     */
    toolbarDOM?: (toolbar: any) => void;
    /**
     * Exposes the pagination DOM, so that you can place it elsewhere
     *
     * example:
     * ```
     * paginationDOM={(dom: any) => document.getElementById('gantt-toolbar')?.append(dom)}
     * ```
     */
    paginationDOM?: (pagination: any) => void;
};

const id = makeId();

export const DataTable = React.memo((props: DataTableProps) => {
    const {
        data = [],
        getData,
        children,
        reducers = [],
        onFetch,
        onScroll,
        compact = false,
        nativeSticky,
        width,
        toolbarDOM,
        paginationDOM,
    } = props;
    const components = Children.toArray(children);
    const wrapperRef = useRef<any>(null);

    const row: any = components.find((x: JSX.Element) => x.type.displayName === 'DataTable.Row');
    const sort: any = components.find((x: JSX.Element) => x.type.displayName === 'DataTable.Sort');
    const tree: any = components.find((x: JSX.Element) => x.type.displayName === 'DataTable.Tree');
    const filter: any = components.find((x: JSX.Element) => x.type.displayName === 'DataTable.Filter');
    const subrow: any = components.find((x: JSX.Element) => x.type.displayName === 'DataTable.Subrow');
    const toolbar: any = components.filter((x: JSX.Element) => x.type.displayName === 'DataTable.Toolbar');
    const checkbox: any = components.find((x: JSX.Element) => x.type.displayName === 'DataTable.Checkbox');
    const pagination: any = components.find((x: JSX.Element) => x.type.displayName === 'DataTable.Pagination');
    const exportPlugin: any = components.find((x: JSX.Element) => x.type.displayName === 'DataTable.Export');
    const stickyHeader: any = components.find((x: JSX.Element) => x.type.displayName === 'DataTable.StickyHeader');
    const columnSelector: any = components.find((x: JSX.Element) => x.type.displayName === 'DataTable.ColumnSelector');

    const bottomComponents = toolbar.filter((x: any) => x.props.placement.startsWith('bottom'));
    const topComponents = toolbar.filter(
        (x: any) =>
            x.props.placement.startsWith('top') ||
            x.props.placement.startsWith('right') ||
            x.props.placement.startsWith('left'),
    );

    /**
     * Add scroll event handler to the table wrapper. It is the wrapper that gets a horizontal scrollbar
     * when table overflows.
     */
    useEffect((): any => {
        const wrapperReference = wrapperRef.current;
        const handleScroll = () => onScroll && onScroll();
        wrapperReference.addEventListener('scroll', handleScroll);
        return () => wrapperReference.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <DataTableStore components={components} reducers={{ dataTableReducer, ...reducers }}>
            <Wrapper id="tableWrapper" width={width}>
                {/**
                 * Top toolbar will list all toolbars with placement beginning with string `top` | `right` | `left`
                 * or plugins `export` | `columnSelector` | `filter`
                 */}
                {(topComponents.length > 0 || exportPlugin || columnSelector || filter) && (
                    <Toolbar id="dataTable-toolbar-top" components={topComponents} shareDOM={toolbarDOM}>
                        <>
                            {exportPlugin && <Export {...exportPlugin.props} />}
                            {columnSelector && <ColumnSelector {...columnSelector.props} ref={columnSelector.ref} />}
                            {filter && <Filter {...filter.props} />}
                        </>
                    </Toolbar>
                )}

                <TableWrapper ref={wrapperRef}>
                    {stickyHeader && (
                        <StickyHeader
                            {...stickyHeader.props}
                            id={id}
                            ref={stickyHeader.ref}
                            plugins={{ subrow, checkbox }}
                        />
                    )}

                    <EdsProvider density={compact ? 'compact' : 'comfortable'}>
                        <Table id="mainTable" style={{ width: '100%' }} {...getDataProps(props)}>
                            {/**
                             * Header can be provided with plugins.
                             * Children must contain only the column definitions.
                             */}
                            <Header id={id} plugins={{ subrow, checkbox, sort }} nativeSticky={nativeSticky}>
                                {components.filter((x: any) => x.type.displayName === 'DataTable.Column')}
                            </Header>

                            {/**
                             * Body can be provided with plugins.
                             * TODO: Try refactor away `{...row?.props}` and add row to plugins
                             */}
                            <Body
                                id={id}
                                {...row?.props}
                                data={data && getData ? getData(data) : data}
                                onFetch={onFetch}
                                plugins={{ subrow, checkbox }}
                            />
                        </Table>
                    </EdsProvider>
                </TableWrapper>

                {/**
                 * Pagination plugin.
                 * Shares its DOM as a callback. When DataTAble is used as a plugin in Gantt,
                 * the pagination can be moved to Gantt bottom toolbar, or elsewhere.
                 */}
                {pagination && (
                    <Pagination
                        count={pagination.props.getCount(data || 0)}
                        {...pagination.props}
                        shareDOM={paginationDOM}
                    />
                )}

                {/**
                 * Bottom toolbar will list all toolbars with placement beginning with string `bottom`
                 */}
                {bottomComponents.length > 0 && <Toolbar id="dataTable-toolbar-bottom" components={bottomComponents} />}

                {tree && <Tree {...tree.props} />}

                {checkbox && <Checkbox {...checkbox.props} ref={checkbox.ref} />}

                {/**
                 * Only allow internal sorting if onFetch is not defined.
                 */}
                {sort && !onFetch && <Sort {...sort.props} />}
            </Wrapper>
        </DataTableStore>
    );
});
