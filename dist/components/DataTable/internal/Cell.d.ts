import React from "react";
declare type TableCellProps = {
    column?: any;
    onClick?: Function;
    item?: any;
    href?: string;
    depth?: number;
};
declare const Cell: React.FC<TableCellProps>;
export default Cell;
