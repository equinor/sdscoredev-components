export declare const SET_ERRORS = "SET_ERRORS";
interface ValidationState {
    errors?: {
        [key: string]: string;
    };
}
export declare const initialState: ValidationState;
export declare const validationReducer: {
    reducer: (state: ValidationState | undefined, action: any) => ValidationState;
    initialState: ValidationState;
};
export {};
