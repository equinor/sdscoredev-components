export declare const SET_PAGE_INDEX = "SET_PAGE_INDEX";
export declare const SET_PAGE_SIZE = "SET_PAGE_SIZE";
interface PaginationState {
    pageIndex?: number;
    pageSize?: number;
}
export declare const initialState: PaginationState;
export declare const paginationReducer: {
    reducer: (state: PaginationState | undefined, action: any) => PaginationState;
    initialState: PaginationState;
};
export {};
