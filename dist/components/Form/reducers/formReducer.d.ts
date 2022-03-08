export declare const SET_DATA = "SET_DATA";
export declare const SET_DEFAULT_DATA = "SET_DEFAULT_DATA";
export declare const RESET_TO_DEFAULT = "RESET_TO_DEFAULT";
interface FormState {
    defaultData?: any;
    data?: any;
}
export declare const initialState: FormState;
export declare const formReducer: {
    reducer: (state: FormState | undefined, action: any) => FormState;
    initialState: FormState;
};
export {};
