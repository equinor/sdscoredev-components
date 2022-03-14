/// <reference types="react" />
interface DefaultQueryState {
}
export declare const initialState: DefaultQueryState;
export declare const defaultQueryReducer: {
    reducer: (state: DefaultQueryState | undefined, action: any) => DefaultQueryState;
    initialState: DefaultQueryState;
    component: import("react").FC<import(".").DefaultQueryProps>;
};
export {};
