export const SET_PAGE_INDEX = "SET_PAGE_INDEX";
export const SET_PAGE_SIZE = "SET_PAGE_SIZE";

interface PaginationState {
    pageIndex?: number,
    pageSize?: number,
}

export const initialState: PaginationState = {
    pageIndex: 1,
    pageSize: 10
};

const reducer = (state = initialState, action: any): PaginationState => {
    switch (action.type) {
        case SET_PAGE_INDEX:
            return {
                ...state,
                pageIndex: action.payload
            };
        case SET_PAGE_SIZE:
            return {
            ...state,
            pageSize: action.payload
            };
        default:
            return state;
    }
};

export const paginationReducer = {reducer, initialState}