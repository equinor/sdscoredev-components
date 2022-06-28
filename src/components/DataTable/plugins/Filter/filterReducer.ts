const SET_SEARCH_STRING = 'SET_SEARCH_STRING';

interface FilterState {
    searchString?: string;
}

export const initialState: FilterState = {
    searchString: undefined,
};

const reducer = (state = initialState, action: any): FilterState => {
    switch (action.type) {
        case SET_SEARCH_STRING:
            return {
                ...state,
                searchString: action.payload,
            };
        default:
            return state;
    }
};

export const filterReducer = { reducer, initialState };
