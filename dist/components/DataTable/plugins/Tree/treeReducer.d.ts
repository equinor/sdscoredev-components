export declare const TREE_TOGGLE = "TREE_TOGGLE";
interface TreeState {
    open: Array<number>;
}
export declare const initialState: TreeState;
export declare const treeReducer: {
    reducer: (state: TreeState | undefined, action: any) => TreeState;
    initialState: TreeState;
};
export {};
