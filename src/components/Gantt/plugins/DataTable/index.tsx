import React from 'react';
import { ReducerProp } from 'types';
import { DataTableProps } from '../../../DataTable';

const DataTable: React.FC<DataTableProps> & ReducerProp = (props) => {
    return <React.Fragment {...props}>DataTable</React.Fragment>;
};

export { DataTable };
