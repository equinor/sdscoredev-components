import { ReactNode } from 'react';

// export const SET_WIDTH = "SET_WIDTH";
export const SET_MEASURES = 'SET_MEASURES';

type TaskListState = {
    svgWidth: number;
    rowHeight: number;
    todayColor: string;
};

export const initialState: TaskListState = {
    svgWidth: 0,
    rowHeight: 48,
    todayColor: '#eee',
};

const reducer = (state = initialState, action: any): TaskListState => {
    switch (action.type) {
        case SET_MEASURES:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export const taskListReducer = { reducer, initialState };
