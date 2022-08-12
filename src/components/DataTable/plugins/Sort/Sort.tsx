import { getByPath } from 'components/helpers';
import { sort } from 'fast-sort';
import React, { useContext, useEffect } from 'react';

import { DispatchContext, StateContext } from '../../DataTableStore';
import { SortProps } from './index';

/**
 * TODO: Implement multiple column sort
 */
export const Sort = (props: SortProps) => {
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);

    /**
     * If default prop is set, then the table will add sorting as default
     */
    useEffect(() => {
        if (props.default) {
            const sort = props.default.split(':');

            if (sort.length >= 1) {
                dispatch({ type: 'SET_ORDER_BY', payload: sort[0] });
            }

            if (sort.length === 2) {
                dispatch({ type: 'SET_DIRECTION', payload: sort[1] === 'asc' });
            }
        }
    }, [props.default]);

    /**
     * @ref https://github.com/snovakovic/fast-sort
     *
     * @param orderBy
     * @param ascending
     */
    const sortTable = (orderBy: string, ascending: boolean) => {
        let sorted: Array<any> = [];

        if (ascending) {
            sorted = sort(state.dataTableReducer.data).asc((x: any) => getByPath(x, orderBy));
        } else {
            sorted = sort(state.dataTableReducer.data).desc((x: any) => getByPath(x, orderBy));
        }

        dispatch({ type: 'SET_DATA', payload: sorted });
    };

    useEffect(() => {
        const { orderBy, ascending } = state.sortReducer;
        if (orderBy && typeof ascending !== 'undefined' && state.dataTableReducer.data) {
            sortTable(orderBy, ascending);
        }
    }, [state.sortReducer]);

    return <></>;
};
