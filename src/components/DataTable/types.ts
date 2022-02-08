export type RowProps = {
    onClick?: Function;
    getLink?: (row: any) => string;
}

export type ColumnProps = {
    id: string;
    maxWidth?: number;
    optional?: boolean;
    tkey?: string;
    render?: JSX.Element | Function;
    orderBy?: string;
    children: Array<JSX.Element> | JSX.Element | string;
}

export type DataTableStoreProps = {
    reducers: any;
}