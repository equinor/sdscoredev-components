import React from "react";
export declare type ColumnProps = {
    /**
     * The key in the result object
     */
    id: string;
    /**
     * Old compability method of using key
     */
    key?: string;
    /**
     * ** Deprecated **
     */
    maxWidth?: number;
    /**
     * Set column visibility to optional, the column is not visible by default,
     * and must be set visible by ColumnSelector
     */
    optional?: boolean;
    /**
     * ** Deprecated **
     */
    tkey?: string;
    /**
     * Custom render callback
     */
    render?: JSX.Element | Function | [Function, {
        [key: string]: any;
    }];
    /**
     * ** Deprecated ** Use sort instead
     * Key representing what this column will be sortet by. Can be either a simple string or
     * a string in this format `user.firstname`
     */
    orderBy?: string;
    /**
     * If set as true, it will add option to sort the column by the `<Column>` id prop.
     * If set as a string, it will sort by the string and not the id prop.
     */
    sort?: string | boolean;
    /**
     * If set, the cell will take up the smallest space possible. Width will be set to 1%
     */
    slim?: boolean;
    /**
     * If set, the cell will truncate the text if exceding the value in pixels
     */
    truncate?: number;
    children: Array<JSX.Element> | JSX.Element | string;
};
export declare const Column: React.FC<ColumnProps>;