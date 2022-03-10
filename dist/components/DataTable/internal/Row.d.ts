import React, { RefAttributes } from "react";
import { RowProps } from '../Row';
declare type TableRowProps = {
    data?: any;
};
declare const Row: React.FC<TableRowProps & RowProps & RefAttributes<HTMLTableRowElement>>;
export default Row;
