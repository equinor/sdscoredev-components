import { SET_PAGE_INDEX, SET_PAGE_SIZE } from '../Pagination/paginationReducer';

export const SET_SELECTED = "SET_SELECTED";

interface SortingState {
    selected: Array<any>
}

export const initialState: SortingState = {
    selected: [],
};

const reducer = (state = initialState, action: any): SortingState => {
    switch (action.type) {
        case SET_SELECTED:
            return {
                ...state,
                selected: action.payload
            };
        case SET_PAGE_INDEX:
            if (state.selected.length > 0) {
                return {
                    ...state,
                    selected: []
                };
            }

            return state;
        case SET_PAGE_SIZE:
            if (state.selected.length > 0) {
                return {
                    ...state,
                    selected: []
                };
            }

            return state;
        default:
            return state;
    }
};

export const checkboxReducer = {reducer, initialState}