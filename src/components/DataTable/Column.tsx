import React from "react";
import { Table } from '@equinor/eds-core-react';
import { ColumnProps } from "./types";

export const Column: React.FC<ColumnProps> = ({ children }) => {
    return (
        <Table.Cell>
            {children}
        </Table.Cell>
    );
}