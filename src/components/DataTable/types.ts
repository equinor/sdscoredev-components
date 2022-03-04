import { ReactElement } from "react"
import { ColumnProps } from "./Column"

export type DataTableStoreProps = {
    reducers: any;
}

export type CustomRenderProps = {
    column: ColumnProps;
    item: { [key: string]: string };
    content: any;
    renderProps?: { [key: string]: any };
}