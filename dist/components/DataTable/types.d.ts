import { ColumnProps } from "./Column";
export declare type DataTableStoreProps = {
    reducers: any;
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
};
