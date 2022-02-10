import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterParser from '../ODataQuery/parser';
import { DefaultQueryProps } from './types';

export const DefaultQuery: React.FC<DefaultQueryProps> = ({ state, dispatch }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialized = useRef(false);
    const urlRef = useRef('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        if (!initialized.current) {
           // Do some state dispatches
        }

        dispatch({ type: 'SET_QUERY', payload: ''});

    }, [location])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
       
        if (initialized.current) {
            
            urlRef.current = `?${params.toString()}`;
            const url = [window.location.pathname, params.toString()].join('?')

            navigate(url)
        }

        initialized.current = true;
        
    }, [state.paginationReducer])

    return (
        <div>DefaultQuery</div>
    )
}
