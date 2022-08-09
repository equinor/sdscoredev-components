import { ReactNode } from 'react';

export const SET_PARAMS = 'SET_PARAMS';
export const SET_MENU_OPEN = 'SET_MENU_OPEN';
export const SET_SIDE_SHEET = 'SET_SIDE_SHEET';
export const SET_PATH = 'SET_PATH';

interface DataTableState {
    params?: any;
    path?: string;
    menuOpen?: boolean;
    sideSheet: ReactNode;
}

export const initialState: DataTableState = {
    params: {},
    path: '',
    menuOpen: true,
    sideSheet: undefined,
};

const reducer = (state = initialState, action: any): DataTableState => {
    switch (action.type) {
        case SET_PARAMS:
            return {
                ...state,
                params: action.payload,
            };
        case SET_PATH:
            return {
                ...state,
                path: action.payload,
            };
        case SET_MENU_OPEN:
            return {
                ...state,
                menuOpen: action.payload,
            };
        case SET_SIDE_SHEET:
            return {
                ...state,
                sideSheet: action.payload,
            };
        default:
            return state;
    }
};

export const layoutReducer = { reducer, initialState };
