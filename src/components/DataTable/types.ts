import React, { FunctionComponent, ReactNode } from 'react';
import { ColumnProps } from './Column';

// From https://stackoverflow.com/a/50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

// From: https://stackoverflow.com/a/53955431
type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

// Here we come!
type SingleKey<T> = IsUnion<keyof T> extends true ? never : {} extends T ? never : T;

export type CustomRenderProps = {
    column?: ColumnProps;
    item?: { [key: string]: any };
    content: any;
    renderProps?: { [key: string]: any };
    depth?: number;
};
