import { ReactNode, useEffect } from "react";

export const SET_EDIT_ROW = "SET_EDIT_ROW";

interface EditableTableState {
    editRowIndex?: boolean;
}

export const initialState: EditableTableState = {
    editRowIndex: false,
};

const reducer = (state = initialState, action: any): EditableTableState => {
    switch (action.type) {
        case SET_EDIT_ROW:
            // Index of the row that is being edited
            return {
                ...state,
                editRowIndex: action.payload,
            };
        default:
            return state;
    }
};

export const editableTableReducer = {reducer, initialState}