import { SET_PAGE_INDEX, SET_PAGE_SIZE } from '../Pagination/paginationReducer';

export const SET_SELECTED = "SET_SELECTED";
export const SET_VISIBLE = "SET_VISIBLE";

interface SortingState {
    selected: Array<any>;
    visible?: boolean; // Only needed if checkbox column should be concealable
}

export const initialState: SortingState = {
    selected: [],
    visible: true, // Show or hide checkbox column in DataTable, default true if optional prop isn't sent to <Checkbox> plugin
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

        case SET_VISIBLE:
            return {
                ...state,
                visible: action.payload
            };

        default:
            return state;
    }
};

export const checkboxReducer = {reducer, initialState}