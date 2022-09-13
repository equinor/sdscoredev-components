import { DataTableProps } from 'components/DataTable';
import React from 'react';
import { ReducerProp } from 'types';

const DataTable: React.FC<DataTableProps> & ReducerProp = (props) => {
    return <React.Fragment {...props}>DataTable</React.Fragment>;
};

export { DataTable };
