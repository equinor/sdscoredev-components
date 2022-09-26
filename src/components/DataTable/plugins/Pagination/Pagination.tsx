/* eslint-disable react/jsx-pascal-case */
import React, { useContext, useEffect } from 'react';
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
} & PaginationProps;

export const Pagination: React.FC<InternalPaginationProps> = ({
    count,
    defaultPageSize,
    pageSizeOptions = [5, 10, 20, 50],
}) => {
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);
    const location = useLocation();

    const { pageIndex, pageSize } = state.paginationReducer;

    if (defaultPageSize && pageSizeOptions && pageSizeOptions.findIndex((x) => x === defaultPageSize) < 0) {
        throw Error(
            `It is not possible to set a defaultPageSize: ${defaultPageSize} that is not in ${pageSizeOptions}`,
        );
    }

    useEffect(() => {
        if (!pageSize && defaultPageSize) dispatch({ type: 'SET_PAGE_SIZE', payload: defaultPageSize });
    }, []);

    /**
     * Resets the pagination when search filter updates
     */
    useEffect(() => {
        // state in the URL
        const params = new URLSearchParams(location.search);
        const pagination = params.get('pagination');

        params.delete('pagination');
        params.delete('sort');

        // searchString currently available in the filterReducer
        const { searchString } = state.filterReducer || {};

        if (searchString) {
            const currentURLSearchParams = new URLSearchParams(state.filterReducer?.searchString);

            // reset pageIndex if pageIndex in params !== currentURLSearchParams
            if (params.toString() !== currentURLSearchParams.toString()) {
                dispatch({ type: 'SET_PAGE_INDEX', payload: 1 });
            }
        }

        if (pagination) {
            const parts = pagination.split(',');

            // reset pageIndex if pageIndex in state is !== parts[0]
            if (parts[0] !== state.paginationReducer.pageIndex) {
                dispatch({ type: 'SET_PAGE_INDEX', payload: parts[0] });
            }
        }
    }, [location]);

    /**
     * Handler for updating page index
     *
     * @param _e
     * @param value
     */
    const handleChangePage = (_e: any, payload: number) => {
        dispatch({ type: 'SET_PAGE_INDEX', payload });
    };

    /**
     * Handler for updating page size
     *
     * @param e
     */
    const handleChangePageSize = (e: any) => {
        dispatch({ type: 'SET_PAGE_SIZE', payload: e.target.value });
    };

    if (!pageSize) return <></>;

    return (
        <Wrapper>
            <NativeSelect
                id=""
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
