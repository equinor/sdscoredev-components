import { ReactNode } from "react";

export const SET_DATA = "SET_DATA";
export const SET_DEFAULT_DATA = "SET_DEFAULT_DATA";

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
        default:
            return state;
    }
};

export const formReducer = {reducer, initialState}