import React from 'react';
import { PaginationProps } from './Pagination/types';

/**
 * Pagination plugin. Must be used together with `paginationReducer`
 * 
 * @param props `<PaginationProps>`
 * @returns `JSX.Element`
 */
export const Pagination: React.FC<PaginationProps> = (props) => {
    return (<React.Fragment {...props}></React.Fragment>)
}
