import React from 'react';
import { PaginationProps } from '../Pagination';
export declare type InternalPaginationProps = {
    count?: number;
} & PaginationProps;
export declare const Pagination: React.FC<InternalPaginationProps>;
