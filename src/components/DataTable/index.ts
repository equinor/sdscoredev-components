import { DataTable as BaseDataTable, DataTableProps } from './DataTable';
import { CustomRenderProps } from './types';
import { Row } from './Row';
import { ColumnSelector } from './plugins/ColumnSelector';
import { Export } from './plugins/Export';
import { Column } from './Column';
import { Pagination } from './plugins/Pagination';
import { Toolbar } from './Toolbar';
import { Filter } from './plugins/Filter';
import { StickyHeader } from './plugins/StickyHeader';
import { DefaultQuery } from './plugins/DefaultQuery';

import { checkboxReducer } from './plugins/checkboxReducer';
import { columnSelectorReducer } from './plugins/ColumnSelector/columnSelectorReducer';
import { defaultQueryReducer } from './plugins/DefaultQuery/defaultQueryReducer';
import { oDataQueryReducer } from './plugins/ODataQuery/oDataQueryReducer';
import { paginationReducer } from './plugins/Pagination/paginationReducer';
import { sortingReducer } from './plugins/sortingReducer';
import { stickyHeaderReducer } from './plugins/StickyHeader/stickyHeaderReducer';

type DataTableCompound = typeof BaseDataTable & {
    Row: typeof Row
    ColumnSelector: typeof ColumnSelector
    Export: typeof Export
    Column: typeof Column
    Pagination: typeof Pagination
    Toolbar: typeof Toolbar
    Filter: typeof Filter
    StickyHeader: typeof StickyHeader
    DefaultQuery: typeof DefaultQuery
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
DataTable.DefaultQuery = DefaultQuery

DataTable.Column.displayName = 'DataTable.Column'
DataTable.ColumnSelector.displayName = 'DataTable.ColumnSelector'
DataTable.Export.displayName = 'DataTable.Export'
DataTable.Filter.displayName = 'DataTable.Filter'
DataTable.Pagination.displayName = 'DataTable.Pagination'
DataTable.Row.displayName = 'DataTable.Row'
DataTable.Toolbar.displayName = 'DataTable.Toolbar'
DataTable.StickyHeader.displayName = 'DataTable.StickyHeader'
DataTable.DefaultQuery.displayName = 'DataTable.DefaultQuery'

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