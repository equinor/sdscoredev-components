import React from 'react';
export declare type PaginationProps = {
    getCount?: Function;
    defaultPageSize?: number;
};
/**
 * Pagination plugin. Must be used together with `paginationReducer`
 *
 * @param props `<PaginationProps>`
 * @returns `JSX.Element`
 */
export declare const Pagination: React.FC<PaginationProps>;
