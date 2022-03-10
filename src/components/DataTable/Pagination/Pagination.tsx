/* eslint-disable react/jsx-pascal-case */
import React, { useContext, useEffect } from 'react';
import { NativeSelect, Pagination as EDSPagination } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { DispatchContext, StateContext } from '../DataTableStore';
import { PaginationProps } from '../Pagination';

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

export const Pagination: React.FC<InternalPaginationProps> = ({ count, defaultPageSize }) => {
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);
    const pageSizeOptions = [5, 10, 20, 50, 100];

    /**
     * Throw error if paginationReducer is not added to the `reducers` prop of `<DataTable>`
     */
    if (!state.paginationReducer) {
        throw Error("No paginationReducer was found. Add one in the <DataTable> reducers prop.")
    }

    const { pageIndex, pageSize } = state.paginationReducer;

    useEffect(() => {
        !pageSize && defaultPageSize && dispatch({ type: "SET_PAGE_SIZE", payload: defaultPageSize })
    }, [])

    /**
     * Handler for updating page index
     * 
     * @param _e 
     * @param value 
     */
    const handleChangePage = (_e: any, payload: number) => {
        dispatch({ type: "SET_PAGE_INDEX", payload })
    }

    /**
     * Handler for updating page size
     * 
     * @param e 
     */
    const handleChangePageSize = (e: any) => {
        dispatch({ type: "SET_PAGE_SIZE", payload: e.target.value })
    }

    if (!pageSize) return <></>

    return (
        <Wrapper>
            <NativeSelect
                id=""
                key={`pageSize-${+pageSize}`} // Must jave key so that it rerender on context update
                label=""
                value={+pageSize}
                onChange={handleChangePageSize}
            >
                {pageSizeOptions.map((pageSize) => <option key={`pageSize-${pageSize}`} value={pageSize}>{pageSize} / page</option>)}
            </NativeSelect>
            <EDSPagination
                key={`pageIndex-${+pageIndex}`} // Must jave key so that it rerender on context update
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
    )
}
