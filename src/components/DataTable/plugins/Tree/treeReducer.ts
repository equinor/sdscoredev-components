export const TREE_TOGGLE = "TREE_TOGGLE";
export const SET_CHILDREN_PROP = "SET_CHILDREN_PROP";

interface TreeState {
    open: Array<number>;
    childrenProp: string;
}

export const initialState: TreeState = {
    open: [],
    childrenProp: 'children',
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
        case SET_CHILDREN_PROP:
            return {
                ...state,
                childrenProp: action.payload,
            };
        default:
            return state;
    }
};

export const treeReducer = {reducer, initialState}