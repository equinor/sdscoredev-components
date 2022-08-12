export const SUBROW_TOGGLE = 'SUBROW_TOGGLE';

interface SubrowState {
    open: Array<number>;
}

export const initialState: SubrowState = {
    open: [],
};

const reducer = (state = initialState, action: any): SubrowState => {
    let tmp;

    switch (action.type) {
        case SUBROW_TOGGLE:
            tmp = [...state.open];
            if (tmp.indexOf(action.payload) !== -1) {
                tmp.splice(tmp.indexOf(action.payload), 1);
            } else {
                tmp.push(action.payload);
            }

            return {
                ...state,
                open: tmp,
            };
        default:
            return state;
    }
};

export const subrowReducer = { reducer, initialState };
