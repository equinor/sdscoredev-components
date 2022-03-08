/// <reference types="react" />
export declare const SET_QUERY = "SET_QUERY";
interface DefaultQueryState {
    query: any;
}
export declare const initialState: DefaultQueryState;
export declare const defaultQueryReducer: {
    reducer: (state: DefaultQueryState | undefined, action: any) => DefaultQueryState;
    initialState: DefaultQueryState;
    component: import("react").FC<{}>;
};
export {};
