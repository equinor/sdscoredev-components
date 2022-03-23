export declare const CALCULATE_COLUMN_WIDTH = "CALCULATE_COLUMN_WIDTH";
interface DataTableState {
    width?: any;
}
export declare const initialState: DataTableState;
export declare const stickyHeaderReducer: {
    reducer: (state: DataTableState | undefined, action: any) => DataTableState;
    initialState: DataTableState;
};
export {};
