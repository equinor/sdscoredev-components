import { FunctionComponent } from "react";
import { ColumnProps } from "./Column";
export declare type DataTableStoreProps = {
    reducers: any;
    components: (React.ReactChild | React.ReactFragment | React.ReactPortal)[];
};
export declare type CustomRenderProps = {
    column: ColumnProps;
    item: {
        [key: string]: string;
    };
    content: any;
    renderProps?: {
        [key: string]: any;
    };
    depth?: number;
};
export declare type State = {
    [key: string]: any;
};
export declare type Reducer = {
    reducer: (state: State | undefined, action: Action) => State;
    initialState: State;
};
export declare type ReducerProp = {
    reducer?: {
        [key: string]: Reducer;
    };
};
export declare type FC<P = {}> = FunctionComponent<P> & ReducerProp;
export declare type Action = {
    type: any;
    payload?: any;
};
