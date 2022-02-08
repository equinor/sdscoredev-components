import { ReactNode } from "react";

export const SET_COLUMNS = "SET_COLUMNS";
export const SET_VISIBLE_COLUMNS = "SET_VISIBLE_COLUMNS";
export const RESET_VISIBLE_COLUMNS = "RESET_VISIBLE_COLUMNS";
export const SET_QUERY = "SET_QUERY";

interface DataTableState {
    columns?: Array<ReactNode>;
    visibleColumns?: Array<string>;
    query?: string;
}

export const initialState: DataTableState = {
    columns: [],
    visibleColumns: [],
    query: undefined,
};

const reducer = (state = initialState, action: any): DataTableState => {
    
    const getDefaultVisibleColumns = (columns: Array<ReactNode>) => {
        const visibleColumns: Array<string> = []
    
        columns.forEach((column: any) => {
            if (typeof column.props.visible === 'undefined') {
                if (column.props.id) visibleColumns.push(column.props.id)
            }
        })
        
        return visibleColumns;
    }

    switch (action.type) {
        case SET_COLUMNS:
            return {
                ...state,
                visibleColumns: getDefaultVisibleColumns(action.payload),
                columns: action.payload
            };
        case SET_VISIBLE_COLUMNS:
            return {
                ...state,
                visibleColumns: action.payload
            };
        case RESET_VISIBLE_COLUMNS:
            if (state.columns) {
                return {
                    ...state,
                    visibleColumns: getDefaultVisibleColumns(state.columns)
                };
            }
            return state;
        case SET_QUERY:
            return {
                ...state,
                query: action.payload
            };
        default:
            return state;
    }
};

export const dataTableReducer = {reducer, initialState}