import { ReactNode } from "react";

export const SET_ERRORS = "SET_ERRORS";

interface ValidationState {
    errors?: { [key: string]: string };
}

export const initialState: ValidationState = {
    errors: {},
};

const reducer = (state = initialState, action: any): ValidationState => {
    
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                errors: action.payload,
            };
        default:
            return state;
    }
};

export const validationReducer = {reducer, initialState}