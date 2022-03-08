/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DefaultQueryProps } from './types';

export const DefaultQuery: React.FC<DefaultQueryProps> = ({ state, dispatch }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const sortingInitialized = useRef(false);
    const paginationInitialized = useRef(false);

    const setInitialPagination = (params: URLSearchParams) => {
        if (!paginationInitialized.current) {
            params.get('pageIndex') && dispatch({ type: 'SET_PAGE_INDEX', payload: params.get('pageIndex') });
            params.get('pageSize') && dispatch({ type: 'SET_PAGE_SIZE', payload: params.get('pageSize') });
        }
    }

    const setInitialSorting = (params: URLSearchParams) => {
        if (!sortingInitialized.current) {
            params.get('orderBy') && dispatch({ type: 'SET_ORDER_BY', payload: params.get('orderBy') });
            params.get('desc') && dispatch({ type: 'SET_DIRECTION', payload: params.get('desc') });
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        setInitialPagination(params)
        setInitialSorting(params)

        dispatch({ type: 'SET_QUERY', payload: params.toString()});

    }, [location])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
       
        if (paginationInitialized.current) {
            params.set('pageSize', state.paginationReducer.pageSize);
            params.set('pageIndex', state.paginationReducer.pageIndex);
            const url = [window.location.pathname, params.toString()].join('?')
            navigate(url)
        }

        paginationInitialized.current = true;
        
    }, [state.paginationReducer])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
       
        if (sortingInitialized.current && state.sortingReducer.orderBy && typeof state.sortingReducer.ascending === 'boolean') {
            params.set('orderBy', state.sortingReducer.orderBy);
            params.set('desc', state.sortingReducer.ascending);
            const url = [window.location.pathname, params.toString()].join('?')
            navigate(url)
        }

        sortingInitialized.current = true;
        
    }, [state.sortingReducer])

    return <></>;
}
