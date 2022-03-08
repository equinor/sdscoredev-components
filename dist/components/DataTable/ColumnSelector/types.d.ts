/// <reference types="react" />
export declare type ColumnSelectorProps = {
    columns?: any;
    visibleColumns?: Array<string>;
    onChange?: Function;
    title?: string;
    icon?: JSX.Element;
    cache?: boolean;
};
export declare type ColumnSelectorRef = {
    setColumn: (column: string, visible: boolean) => void;
} | null;
