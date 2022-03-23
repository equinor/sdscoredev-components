export const TREE_TOGGLE = "TREE_TOGGLE";

interface TreeState {
    open: Array<number>;
}

export const initialState: TreeState = {
    open: [],
};

const reducer = (state = initialState, action: any): TreeState => {

    let tmp;

    switch (action.type) {
        case TREE_TOGGLE:
            tmp = [...state.open];
            if (tmp.indexOf(action.payload) !== -1) {
                tmp.splice(tmp.indexOf(action.payload), 1);
            } else {
                tmp.push (action.payload)
            }

            return {
                ...state,
                open: tmp,
            };
        default:
            return state;
    }
};

export const treeReducer = {reducer, initialState}