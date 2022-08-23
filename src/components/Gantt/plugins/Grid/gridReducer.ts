import { ReactNode } from 'react';

// export const SET_WIDTH = "SET_WIDTH";
export const SET_MEASURES = 'SET_MEASURES';
export const SET_SCROLL_X = 'SET_SCROLL_X';
export const SET_SCROLL_Y = 'SET_SCROLL_Y';

type GridState = {
    svgWidth: number;
    rowHeight: number;
    todayColor: string;
    scrollX: number;
    scrollY: number;
};

export const initialState: GridState = {
    svgWidth: 0,
    rowHeight: 50,
    todayColor: '#eee',
    scrollX: 0,
    scrollY: 0,
};

const reducer = (state = initialState, action: any): GridState => {
    switch (action.type) {
        case SET_MEASURES:
            return {
                ...state,
                ...action.payload,
            };
        case SET_SCROLL_X:
            return {
                ...state,
                scrollX: action.payload,
            };
        case SET_SCROLL_Y:
            return {
                ...state,
                scrollY: action.payload,
            };
        default:
            return state;
    }
};

export const gridReducer = { reducer, initialState };
