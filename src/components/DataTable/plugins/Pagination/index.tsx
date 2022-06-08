import React from 'react';
import { FC, ReducerProp } from '../../types';
import { paginationReducer } from './paginationReducer';

export type PaginationProps = {
    getCount?: Function;
    defaultPageSize?: number;
}

/**
 * Pagination plugin
 * 
 * @param props `<PaginationProps>`
 * @returns `JSX.Element`
 */
const Pagination: React.FC<PaginationProps> & ReducerProp = (props) => {
    return (<React.Fragment {...props}>Pagination</React.Fragment>)
}

Pagination.reducer = { paginationReducer }

export { Pagination }
