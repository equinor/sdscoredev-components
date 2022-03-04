import { ReactNode } from "react";

export const SET_DATA = "SET_DATA";
export const SET_DEFAULT_DATA = "SET_DEFAULT_DATA";
export const RESET_TO_DEFAULT = "RESET_TO_DEFAULT";

interface FormState {
    defaultData?: any;
    data?: any;
}

export const initialState: FormState = {
    data: {},
};

const reducer = (state = initialState, action: any): FormState => {
    
    switch (action.type) {
        case SET_DEFAULT_DATA:
            return {
                ...state,
                data: action.payload,
                defaultData: action.payload
            };
        case SET_DATA:
            return {
                ...state,
                data: action.payload
            };
        case RESET_TO_DEFAULT:
            return {
                ...state,
                data: state.defaultData,
            };
        default:
            return state;
    }
};

export const formReducer = {reducer, initialState}