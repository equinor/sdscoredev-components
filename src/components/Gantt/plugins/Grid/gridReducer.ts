import { ReactNode } from 'react';

// export const SET_WIDTH = "SET_WIDTH";
export const SET_MEASURES = 'SET_MEASURES';
export const SET_SCROLL_X = 'SET_SCROLL_X';
export const SET_SCROLL_Y = 'SET_SCROLL_Y';
export const SET_FOCUS = 'SET_FOCUS';
export const SET_TICK_WIDTH = 'SET_TICK_WIDTH';

type GridState = {
    rowHeight: number;
    todayColor: string;
    scrollX: number;
    scrollY: number;
    focus: Array<Date>;
    tickWidth: number;
};

export const initialState: GridState = {
    rowHeight: 50,
    todayColor: '#eee',
    scrollX: 0,
    scrollY: 0,
    focus: [],
    tickWidth: 0,
};

const reducer = (state = initialState, action: any): GridState => {
    switch (action.type) {
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
        case SET_FOCUS:
            return {
                ...state,
                focus: action.payload,
            };
        case SET_TICK_WIDTH:
            return {
                ...state,
                tickWidth: action.payload,
            };
        default:
            return state;
    }
};

export const gridReducer = { reducer, initialState };
