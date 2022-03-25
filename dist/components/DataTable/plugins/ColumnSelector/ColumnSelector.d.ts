import React from 'react';
import { ColumnSelectorProps, ColumnSelectorRef } from '.';
export declare type InternalColumnSelectorProps = {
    columns?: any;
    visibleColumns?: Array<string>;
    onChange?: Function;
} & ColumnSelectorProps;
export declare const ColumnSelector: React.ForwardRefExoticComponent<Pick<InternalColumnSelectorProps, "title" | "columns" | "visibleColumns" | "onChange" | "icon" | "cacheKey"> & React.RefAttributes<ColumnSelectorRef>>;
