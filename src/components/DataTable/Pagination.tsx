import React from 'react';

export type PaginationProps = {
    getCount?: Function;
    defaultPageSize?: number;
}

/**
 * Pagination plugin. Must be used together with `paginationReducer`
 * 
 * @param props `<PaginationProps>`
 * @returns `JSX.Element`
 */
export const Pagination: React.FC<PaginationProps> = (props) => {
    return (<React.Fragment {...props}>Pagination</React.Fragment>)
}
