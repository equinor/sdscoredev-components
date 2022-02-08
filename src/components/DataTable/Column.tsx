import React from "react";
import { Table } from '@equinor/eds-core-react';
import { ColumnProps } from "./types";
// import { DataTableContext } from './DataTableStore';

export const Column: React.FC<ColumnProps> = ({ children }) => {
    // const { setSorting, sorting, visibleColumns } = useContext(DataTableContext);

    // const isVisible = () => (id && visibleColumns?.includes(id)) || !visibleColumns

    // const handleSorting = () => setSorting && setSorting({ orderBy, desc: !sorting.desc})

    // if (!isVisible) return <></>;

    // if (orderBy) {
    //     return (
    //         <Table.Cell onClick={handleSorting}>
    //             {/* {children} <Icon name={sorting.desc ? 'chevron_up' : 'chevron_down'} /> */}
    //         </Table.Cell>
    //     )
    // }

    return (
        <Table.Cell>
            {children}
        </Table.Cell>
    );
}