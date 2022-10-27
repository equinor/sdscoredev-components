/* eslint-disable react/jsx-pascal-case */
import React, { createRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { NativeSelect, Pagination as EDSPagination } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { DispatchContext, StateContext } from '../../DataTableStore';
import { PaginationProps } from './index';

const {
    colors: {
        infographic: {
            primary__moss_green_34: { hex: selectedBgColor },
        },
    },
} = tokens;

const Wrapper = styled.div`
    display: inline-grid;
    grid-template-columns: 128px auto;
    grid-gap: 32px;
    float: right;
    padding-top: 32px;
`;

export type InternalPaginationProps = {
    count?: number;
    shareDOM?: any;
} & PaginationProps;

export const Pagination: React.FC<InternalPaginationProps> = ({
    count,
    defaultPageSize,
    shareDOM,
    onChange,
    pageSizeOptions = [5, 10, 20, 50],
}) => {
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);
    const location = useLocation();

    const { pageIndex, pageSize } = state.paginationReducer;

    const paginationRef = createRef<any>();

    if (defaultPageSize && pageSizeOptions && pageSizeOptions.findIndex((x) => x === defaultPageSize) < 0) {
        throw Error(
            `It is not possible to set a defaultPageSize: ${defaultPageSize} that is not in ${pageSizeOptions}`,
        );
    }

    useEffect(() => {
        if (!pageSize && defaultPageSize) dispatch({ type: 'SET_PAGE_SIZE', payload: defaultPageSize });
    }, []);

    /**
     * If shareDOM is set, the DOM reference is shared to the outside of the dataTable
     */
    // eslint-disable-next-line react/no-find-dom-node
    useEffect(() => {
        if (shareDOM && paginationRef.current) shareDOM(paginationRef.current);
    });

    /**
     * Resets the pagination when search filter updates
     */
    useEffect(() => {
        // state in the URL
        const params = new URLSearchParams(location.search);
        const current = new URLSearchParams(state.filterReducer?.searchString);

        params.delete('pagination');
        params.delete('sort');
        params.delete('pageSize');
        params.delete('pageIndex');
        params.delete('orderBy');
        params.delete('desc');
        current.delete('pagination');
        current.delete('sort');
        current.delete('pageSize');
        current.delete('pageIndex');
        current.delete('orderBy');
        current.delete('desc');

        if (params.toString() !== current.toString()) {
            dispatch({ type: 'SET_PAGE_INDEX', payload: 1 });
        }
    }, [location.search]);

    /**
     * Handler for updating page index
     *
     * @param _e
     * @param value
     */
    const handleChangePage = (_e: any, payload: number) => {
        dispatch({ type: 'SET_PAGE_INDEX', payload });
        if (onChange) onChange(payload, pageSize);
    };

    /**
     * Handler for updating page size
     *
     * @param e
     */
    const handleChangePageSize = (e: any) => {
        dispatch({ type: 'SET_PAGE_SIZE', payload: e.target.value });
        if (onChange) onChange(pageIndex, e.target.value);
    };

    if (!pageSize) return <></>;

    return (
        <Wrapper id="paginationWrapper" ref={paginationRef}>
            <NativeSelect
                id="pageSelector"
                key={`pageSize-${+pageSize}`} // Must have key so that it rerender on context update
                label=""
                value={+pageSize}
                onChange={handleChangePageSize}
            >
                {pageSizeOptions.map((pageSize) => (
                    <option key={`pageSize-${pageSize}`} value={pageSize}>
                        {pageSize} / page
                    </option>
                ))}
            </NativeSelect>
            <EDSPagination
                key={`pageIndex-${+pageIndex}`} // Must have key so that it rerender on context update
                totalItems={count || 0}
                itemsPerPage={+pageSize}
                defaultPage={+pageIndex}
                withItemIndicator
                // @ts-ignore
                onChange={handleChangePage}
                style={{
                    // @ts-ignore
                    '--eds_interactive_primary__selected_highlight': selectedBgColor,
                }}
            />
        </Wrapper>
    );
};
