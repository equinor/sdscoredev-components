import React, { forwardRef, useContext, useEffect, useMemo, useRef } from 'react';
import { Table } from '@equinor/eds-core-react';
import Row from './Row';
import { DispatchContext, StateContext } from '../DataTableStore';
import { Subrow } from '../plugins/Subrow/Subrow';
import styled from 'styled-components';

const PaddedText = styled.div`
    padding: 16px;
`;

type TableBodyProps = {
    data?: any;
    onFetch?: Function;
    children?: any;
    id?: string;
    plugins?: any;
};

/**
 * TODO: Needs to be split in two separate Body components, One default, and one for the Tree plugin
 */
const Body = forwardRef<HTMLTableSectionElement, TableBodyProps>((props: TableBodyProps, ref) => {
    const { data, onFetch, id, plugins } = props;
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);
    const rowRef = useRef<any>(null);
    const redraw = useRef<number>(0);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (+state.paginationReducer?.pageIndex - 1) * +state.paginationReducer?.pageSize;
        const lastPageIndex = firstPageIndex + +state.paginationReducer?.pageSize;
        return data?.slice(firstPageIndex, lastPageIndex);
    }, [state.paginationReducer, data]);

    const usePagination = () => {
        if (state.paginationReducer) {
            if (state.oDataQueryReducer) {
                return false;
            }
            if (state.defaultQueryReducer) {
                return false;
            }
            return true;
        }
        return false;
    };

    /**
     * Initialize data so that we can draw the table rows
     */
    useEffect(() => {
        data && dispatch({ type: 'SET_DATA', payload: data });
    }, [data]);

    useEffect(() => {
        onFetch && onFetch(state.dataTableReducer.query);
    }, []);

    useEffect(() => {
        if (typeof state.dataTableReducer.query !== 'undefined') {
            onFetch && onFetch(state.dataTableReducer.query);
        }
    }, [state.dataTableReducer.query]);

    useEffect(() => {
        if (redraw.current < 3 && state.columnSelectorReducer && state.columnSelectorReducer.visibleColumns) {
            let payload = state.columnSelectorReducer.visibleColumns;
            if (plugins.subrow && !payload.includes('__subrow')) payload.push('__subrow');

            // dispatch({ type: "CALCULATE_COLUMN_WIDTH", payload, id })
            redraw.current++;
        }
    }, [redraw.current]);

    /**
     * Provides rows recursively
     */
    const generateRows = (items: any, depth: number | undefined = undefined) => {
        typeof depth == 'number' ? depth++ : (depth = 0);

        if (!Array.isArray(items)) {
            throw Error(
                'It appears that you maybe have not defined `getData` properly. Try something like `getData={(data: any) => data.items}`',
            );
        }

        if (!items || items.length === 0) {
            return <PaddedText>No data was found</PaddedText>;
        }

        return items.map((item: any, index: number) => (
            <React.Fragment key={index}>
                <Row {...props} depth={depth} data={item} ref={(el) => (rowRef.current = el)} key={`row-${item.id}`} />
                {state.treeReducer &&
                    item[state.treeReducer.childrenProp] &&
                    state.treeReducer.open.includes(item.id) &&
                    generateRows(item[state.treeReducer.childrenProp], depth)}
                {plugins.subrow && state.subrowReducer && state.subrowReducer.open.includes(item.id) && (
                    <Subrow {...plugins.subrow.props} data={item} key={`row-${item.id}-subrow`} />
                )}
            </React.Fragment>
        ));
    };

    if (!state.dataTableReducer.data) return <></>;

    return (
        <Table.Body ref={ref} id={`dataTable.body.${id}`}>
            {generateRows(usePagination() ? currentTableData : state.dataTableReducer.data)}
        </Table.Body>
    );
});

export default Body;
