import { ReactNode } from 'react';

export const SET_COLUMNS = 'SET_COLUMNS';
export const SET_PLUGIN_COLUMN_PROPS = 'SET_PLUGIN_COLUMN_PROPS';
export const SET_QUERY = 'SET_QUERY';
export const SET_DATA = 'SET_DATA';

type Properties = { [key: string]: any };

interface DataTableState {
    data?: Array<any>;
    columns?: Array<ReactNode>;
    pluginColumnProps?: { [key: string]: Properties };
    query?: string;
}

export const initialState: DataTableState = {
    columns: [],
    query: undefined,
};

const reducer = (state = initialState, action: any): DataTableState => {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                data: action.payload,
            };
        case SET_COLUMNS:
            return {
                ...state,
                columns: action.payload,
            };
        case SET_PLUGIN_COLUMN_PROPS:
            return {
                ...state,
                pluginColumnProps: action.payload,
            };
        case SET_QUERY:
            return {
                ...state,
                query: action.payload,
            };
        default:
            return state;
    }
};

export const dataTableReducer = { reducer, initialState };
