import { FunctionComponent, ReactNode } from "react"
import { ColumnProps } from "./Column"

// From https://stackoverflow.com/a/50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

// From: https://stackoverflow.com/a/53955431
type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

// Here we come!
type SingleKey<T> = IsUnion<keyof T> extends true ? never : {} extends T ? never : T;

export type DataTableStoreProps = {
    reducers: any;
    components: (React.ReactChild | React.ReactFragment | React.ReactPortal)[];
}

export type CustomRenderProps = {
    column: ColumnProps;
    item: { [key: string]: string };
    content: any;
    renderProps?: { [key: string]: any };
    depth?: number;
}

export type State = { [key: string]: any };

export type Reducer = {
    reducer: (state: State | undefined, action: Action) => State;
    initialState: State;
}

export type ReducerProp = {
    reducer?: { [key: string]: Reducer };
}

export type FC<P = {}> = FunctionComponent<P> & ReducerProp;

export type Action = {
    type: any;
    payload?: any;
};
