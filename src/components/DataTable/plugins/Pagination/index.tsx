import React from 'react';
import { FC } from '../../types';
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
const Pagination: FC<PaginationProps> = (props) => {
    return (<React.Fragment {...props}>Pagination</React.Fragment>)
}

Pagination.reducer = { paginationReducer }

export { Pagination }
