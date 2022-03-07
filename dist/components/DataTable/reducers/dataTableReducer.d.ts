import { ReactNode } from "react";
export declare const SET_COLUMNS = "SET_COLUMNS";
export declare const SET_QUERY = "SET_QUERY";
export declare const SET_DATA = "SET_DATA";
interface DataTableState {
    data?: Array<any>;
    columns?: Array<ReactNode>;
    query?: string;
}
export declare const initialState: DataTableState;
export declare const dataTableReducer: {
    reducer: (state: DataTableState | undefined, action: any) => DataTableState;
    initialState: DataTableState;
};
export {};
