import { ReactNode } from "react";

// export const SET_WIDTH = "SET_WIDTH";
export const CALCULATE_COLUMN_WIDTH = "CALCULATE_COLUMN_WIDTH";

interface DataTableState {
    width?: any;
}

export const initialState: DataTableState = {
    width: {},
};

const reducer = (state = initialState, action: any): DataTableState => {
    
    /**
     * Calculates widths of the header columns
     * 
     * @returns void
     */
     const calculateColumnWidth = (visibleColumns: Array<string>, id: string) => {
        const headerElement = document.getElementById(`dataTable.headerRow.${id}`);

        if (!headerElement) return state.width

        const payload = {}
        Array.from(headerElement.children).forEach((child: any) => {
            if (visibleColumns && visibleColumns.includes(child.id)) {
                payload[child.id] = child.getBoundingClientRect().width - 32 // TODO: Must not use hard coded value (padding)
            }
        })
        return payload
    }

    switch (action.type) {
        case CALCULATE_COLUMN_WIDTH:
            return {
                ...state,
                width: calculateColumnWidth(action.payload, action.id)
            };
        default:
            return state;
    }
};

export const stickyHeaderReducer = {reducer, initialState}