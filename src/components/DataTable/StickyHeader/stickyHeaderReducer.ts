import { ReactNode } from "react";

export const SET_WIDTH = "SET_WIDTH";

interface DataTableState {
    width?: any;
}

export const initialState: DataTableState = {
    width: {},
};

const reducer = (state = initialState, action: any): DataTableState => {
    
    switch (action.type) {
        case SET_WIDTH:
            return {
                ...state,
                width: action.payload
            };
        default:
            return state;
    }
};

export const stickyHeaderReducer = {reducer, initialState}