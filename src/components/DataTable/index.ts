import { DataTable as BaseDataTable, DataTableProps } from './DataTable';
import { Row } from './Row';
import { ColumnSelector } from './ColumnSelector';
import { Column } from './Column';
import { Pagination } from './Pagination';
import { TableToolbar } from './TableToolbar';
import { Filter } from './Filter';
import { StickyHeader } from './StickyHeader';

import { checkboxReducer } from './reducers/checkboxReducer';
import { columnSelectorReducer } from './ColumnSelector/columnSelectorReducer';
import { oDataQueryReducer } from './ODataQuery/oDataQueryReducer';
import { paginationReducer } from './Pagination/paginationReducer';
import { sortingReducer } from './reducers/sortingReducer';
import { stickyHeaderReducer } from './StickyHeader/stickyHeaderReducer';

type DataTableCompound = typeof BaseDataTable & {
    Row: typeof Row
    ColumnSelector: typeof ColumnSelector
    Column: typeof Column
    Pagination: typeof Pagination
    TableToolbar: typeof TableToolbar
    Filter: typeof Filter
    StickyHeader: typeof StickyHeader
}

const DataTable = BaseDataTable as DataTableCompound

DataTable.Column = Column
DataTable.ColumnSelector = ColumnSelector
DataTable.Filter = Filter
DataTable.Pagination = Pagination
DataTable.Row = Row
DataTable.TableToolbar = TableToolbar
DataTable.StickyHeader = StickyHeader

DataTable.Column.displayName = 'DataTable.Column'
DataTable.ColumnSelector.displayName = 'DataTable.ColumnSelector'
DataTable.Filter.displayName = 'DataTable.Filter'
DataTable.Pagination.displayName = 'DataTable.Pagination'
DataTable.Row.displayName = 'DataTable.Row'
DataTable.TableToolbar.displayName = 'DataTable.TableToolbar'
DataTable.StickyHeader.displayName = 'DataTable.StickyHeader'

export { 
    DataTable,
    
    checkboxReducer,
    columnSelectorReducer,
    oDataQueryReducer,
    paginationReducer,
    sortingReducer,
    stickyHeaderReducer,
}

// TODO: Add more types to export
export type { DataTableProps } 