import { ReactNode } from 'react';

// export const SET_WIDTH = "SET_WIDTH";
export const SET_MEASURES = 'SET_MEASURES';

interface GridState {
    svgWidth: number;
    rowHeight: number;
    columnWidth: number;
    todayColor: string;
}

export const initialState: GridState = {
    svgWidth: 0,
    rowHeight: 50,
    columnWidth: 100,
    todayColor: '#eee',
};

const reducer = (state = initialState, action: any): GridState => {
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

export const gridReducer = { reducer, initialState };
