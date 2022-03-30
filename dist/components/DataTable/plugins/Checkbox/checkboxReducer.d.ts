export declare const SET_SELECTED = "SET_SELECTED";
interface SortingState {
    selected: Array<any>;
}
export declare const initialState: SortingState;
export declare const checkboxReducer: {
    reducer: (state: SortingState | undefined, action: any) => SortingState;
    initialState: SortingState;
};
export {};
