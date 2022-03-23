export declare const SET_ORDER_BY = "SET_ORDER_BY";
export declare const SET_DIRECTION = "SET_DIRECTION";
export declare const SORT = "SORT";
interface SortingState {
    orderBy?: string;
    ascending?: boolean;
}
export declare const initialState: SortingState;
export declare const sortingReducer: {
    reducer: (state: SortingState | undefined, action: any) => SortingState;
    initialState: SortingState;
};
export {};
