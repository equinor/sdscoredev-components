import { DataTable as BaseDataTable, DataTableProps } from './DataTable';
import { CustomRenderProps } from './types';
import { Row } from './Row';
import { ColumnSelector } from './ColumnSelector';
import { Export } from './Export';
import { Column } from './Column';
import { Pagination } from './Pagination';
import { Toolbar } from './Toolbar';
import { Filter } from './Filter';
import { StickyHeader } from './StickyHeader';

import { checkboxReducer } from './reducers/checkboxReducer';
import { columnSelectorReducer } from './ColumnSelector/columnSelectorReducer';
import { defaultQueryReducer } from './DefaultQuery/defaultQueryReducer';
import { oDataQueryReducer } from './ODataQuery/oDataQueryReducer';
import { paginationReducer } from './Pagination/paginationReducer';
import { sortingReducer } from './reducers/sortingReducer';
import { stickyHeaderReducer } from './StickyHeader/stickyHeaderReducer';

type DataTableCompound = typeof BaseDataTable & {
    Row: typeof Row
    ColumnSelector: typeof ColumnSelector
    Export: typeof Export
    Column: typeof Column
    Pagination: typeof Pagination
    Toolbar: typeof Toolbar
    Filter: typeof Filter
    StickyHeader: typeof StickyHeader
}

const DataTable = BaseDataTable as DataTableCompound

DataTable.Column = Column
DataTable.ColumnSelector = ColumnSelector
DataTable.Export = Export
DataTable.Filter = Filter
DataTable.Pagination = Pagination
DataTable.Row = Row
DataTable.Toolbar = Toolbar
DataTable.StickyHeader = StickyHeader

DataTable.Column.displayName = 'DataTable.Column'
DataTable.ColumnSelector.displayName = 'DataTable.ColumnSelector'
DataTable.Export.displayName = 'DataTable.Export'
DataTable.Filter.displayName = 'DataTable.Filter'
DataTable.Pagination.displayName = 'DataTable.Pagination'
DataTable.Row.displayName = 'DataTable.Row'
DataTable.Toolbar.displayName = 'DataTable.Toolbar'
DataTable.StickyHeader.displayName = 'DataTable.StickyHeader'

export { 
    DataTable,
    
    checkboxReducer,
    columnSelectorReducer,
    defaultQueryReducer,
    oDataQueryReducer,
    paginationReducer,
    sortingReducer,
    stickyHeaderReducer,
}

// TODO: Add more types to export
export type { DataTableProps, CustomRenderProps } 