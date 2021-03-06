export const SET_ORDER_BY = 'SET_ORDER_BY';
export const SET_DIRECTION = 'SET_DIRECTION';
export const SORT = 'SORT';

interface SortState {
    orderBy?: string;
    ascending?: boolean;
}

export const initialState: SortState = {
    orderBy: undefined,
    ascending: undefined,
};

const reducer = (state = initialState, action: any): SortState => {
    switch (action.type) {
        case SET_ORDER_BY:
            return {
                ...state,
                orderBy: action.payload,
            };
        case SET_DIRECTION:
            return {
                ...state,
                ascending: action.payload,
            };
        case SORT:
            return {
                ...state,
                orderBy: action.payload,
                ascending: !state.ascending,
            };
        default:
            return state;
    }
};

export const sortReducer = { reducer, initialState };
