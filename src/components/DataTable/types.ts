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
    /**
     * If set, the cell will take up the smallest space possible. Width is set to 1%
     */
    slim?: boolean;
}

export type DataTableStoreProps = {
    reducers: any;
}