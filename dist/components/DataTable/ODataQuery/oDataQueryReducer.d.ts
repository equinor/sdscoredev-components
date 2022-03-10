/// <reference types="react" />
interface ODataQueryState {
}
export declare const initialState: ODataQueryState;
export declare const oDataQueryReducer: {
    reducer: (state: ODataQueryState | undefined, action: any) => ODataQueryState;
    initialState: ODataQueryState;
    component: import("react").FC<import("../ODataQuery").ODataQueryProps>;
};
export {};
