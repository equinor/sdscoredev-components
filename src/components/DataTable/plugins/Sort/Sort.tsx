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
     * @ref https://github.com/snovakovic/fast-sort
     *
     * @param orderBy
     * @param ascending
     */
    const sortTable = (orderBy: string, ascending: boolean) => {
        let sorted: Array<any> = [];
        if (ascending) {
            sorted = sort(state.dataTableReducer.data).asc((x: any) => x[orderBy]);
        } else {
            sorted = sort(state.dataTableReducer.data).desc((x: any) => x[orderBy]);
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
