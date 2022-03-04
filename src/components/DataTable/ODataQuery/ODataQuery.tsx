/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterParser from './parser';
import { ODataQueryProps } from './types';

export const ODataQuery: React.FC<ODataQueryProps> = ({ state, dispatch }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const sortingInitialized = useRef(false);
    const paginationInitialized = useRef(false);

    const setInitialPagination = (params: URLSearchParams) => {
        const pagination = params.get('pagination');

        if (!paginationInitialized.current && pagination) {
            const items = pagination.split(',');

            dispatch({ type: 'SET_PAGE_INDEX', payload: +items[0] });
            dispatch({ type: 'SET_PAGE_SIZE', payload: +items[1] });
        }
    }

    const setInitialSorting = (params: URLSearchParams) => {
        const sort = params.get('sort');

        if (!sortingInitialized.current && sort) {
            const items = sort.split(',');

            dispatch({ type: 'SET_ORDER_BY', payload: items[0] });
            dispatch({ type: 'SET_DIRECTION', payload: items[1] === 'ascending' ? true : false });
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        setInitialPagination(params)
        setInitialSorting(params)

        let filterQuery = new FilterParser(params, { logging: false, defaultPagination: '1,10' }).parse();
        dispatch({ type: 'SET_QUERY', payload: filterQuery});

    }, [location])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
       
        if (paginationInitialized.current) {
            params.set('pagination', [state.paginationReducer.pageIndex, state.paginationReducer.pageSize].join(','));
            const url = [window.location.pathname, params.toString()].join('?')
            navigate(url)
        }

        paginationInitialized.current = true;
        
    }, [state.paginationReducer])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
       
        if (sortingInitialized.current && state.sortingReducer.orderBy && typeof state.sortingReducer.ascending === 'boolean') {
            params.set('sort', [state.sortingReducer.orderBy, state.sortingReducer.ascending ? 'ascending' : 'descending'].join(','));
            const url = [window.location.pathname, params.toString()].join('?')
            navigate(url)
        }

        sortingInitialized.current = true;
        
    }, [state.sortingReducer])

    return <></>;
}
