import { DataTable as BaseDataTable, DataTableProps } from './DataTable';
import { Row } from './Row';
import { ColumnSelector } from './ColumnSelector';
import { Column } from './Column';
import { Pagination } from './Pagination';
import { Filter } from './Filter';

import { sortingReducer } from './reducers/sortingReducer';
import { paginationReducer } from './Pagination/paginationReducer';
import { oDataQueryReducer } from './ODataQuery/oDataQueryReducer';

type DataTableCompound = typeof BaseDataTable & {
    Row: typeof Row
    ColumnSelector: typeof ColumnSelector
    Column: typeof Column
    Pagination: typeof Pagination
    Filter: typeof Filter
}

const DataTable = BaseDataTable as DataTableCompound

DataTable.Row = Row
DataTable.ColumnSelector = ColumnSelector
DataTable.Column = Column
DataTable.Pagination = Pagination
DataTable.Filter = Filter

DataTable.Row.displayName = 'Table.Row'
DataTable.ColumnSelector.displayName = 'Table.ColumnSelector'
DataTable.Column.displayName = 'Table.Column'
DataTable.Pagination.displayName = 'Table.Pagination'
DataTable.Filter.displayName = 'Table.Filter'

export { DataTable, sortingReducer, paginationReducer, oDataQueryReducer }

// TODO: Add more types to export
export type { DataTableProps } 