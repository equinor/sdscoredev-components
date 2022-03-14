import { FC } from '../../types';
export declare type PaginationProps = {
    getCount?: Function;
    defaultPageSize?: number;
};
/**
 * Pagination plugin
 *
 * @param props `<PaginationProps>`
 * @returns `JSX.Element`
 */
declare const Pagination: FC<PaginationProps>;
export { Pagination };
