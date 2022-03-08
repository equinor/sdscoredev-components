export type ColumnSelectorProps = {
    columns?: any;
    visibleColumns?: Array<string>;
    onChange?: Function;
    title?: string;
    icon?: JSX.Element;
    cache?: boolean;
};

export type ColumnSelectorRef = {
    setColumn: (column: string, visible: boolean) => void;
  } | null;