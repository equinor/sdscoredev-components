import React, { MouseEventHandler } from "react";
declare type TableHeaderCellProps = {
    column: JSX.Element;
    onClick: MouseEventHandler<HTMLTableCellElement>;
    id: string;
    width?: number;
};
declare const HeaderCell: React.FC<TableHeaderCellProps>;
export default HeaderCell;
