export declare const SET_COLUMNS = "SET_COLUMNS";
export declare const SET_VISIBLE_COLUMNS = "SET_VISIBLE_COLUMNS";
export declare const RESET_VISIBLE_COLUMNS = "RESET_VISIBLE_COLUMNS";
interface ColumnSelectorState {
    visibleColumns?: Array<string>;
}
export declare const initialState: ColumnSelectorState;
export declare const columnSelectorReducer: {
    reducer: (state: ColumnSelectorState | undefined, action: any) => ColumnSelectorState;
    initialState: ColumnSelectorState;
};
export {};
