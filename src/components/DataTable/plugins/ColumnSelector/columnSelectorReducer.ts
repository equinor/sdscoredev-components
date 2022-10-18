import { ReactNode } from 'react';

export const SET_COLUMNS = 'SET_COLUMNS';
export const SET_VISIBLE_COLUMNS = 'SET_VISIBLE_COLUMNS';
export const RESET_VISIBLE_COLUMNS = 'RESET_VISIBLE_COLUMNS';

interface ColumnSelectorState {
    visibleColumns?: Array<string>;
}

export const initialState: ColumnSelectorState = {
    visibleColumns: undefined,
};

const reducer = (state = initialState, action: any): ColumnSelectorState => {
    const getDefaultVisibleColumns = (columns: Array<ReactNode>) => {
        const visibleColumns: Array<string> = [];

        columns.forEach((column: any) => {
            if (typeof column.props.optional === 'undefined') {
                if (column.props.id) visibleColumns.push(column.props.id);
            }
        });

        return visibleColumns;
    };

    const getDefaultVisibleColumnsReset = (columns: {
        allColumns: Array<ReactNode>;
        visibleColumns?: Array<string>;
    }) => {
        const { allColumns, visibleColumns } = columns;
        const newVisibleColumns: Array<string> = [];

        allColumns.forEach((column: any) => {
            if (typeof column.props.optional === 'undefined') {
                if (column.props.id) newVisibleColumns.push(column.props.id);
            } // column that start with "__" will be included if visible
            else if (column.props?.id.startsWith('__')) {
                if (visibleColumns?.includes(column.props.id)) {
                    newVisibleColumns.push(column.props.id);
                }
            }
        });

        return newVisibleColumns;
    };

    switch (action.type) {
        case SET_COLUMNS:
            // If state is set by cache return state
            if (state.visibleColumns) return state;

            // Default, get visible columns from column definitions
            return {
                ...state,
                visibleColumns: getDefaultVisibleColumns(action.payload),
            };
        case SET_VISIBLE_COLUMNS:
            return {
                ...state,
                visibleColumns: action.payload,
            };
        case RESET_VISIBLE_COLUMNS:
            if (action.payload) {
                return {
                    ...state,
                    visibleColumns: getDefaultVisibleColumnsReset(action.payload),
                };
            }
            return state;
        default:
            return state;
    }
};

export const columnSelectorReducer = { reducer, initialState };
