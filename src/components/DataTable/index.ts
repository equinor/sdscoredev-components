import { DataTable as BaseDataTable, DataTableProps } from './DataTable';
import { CustomRenderProps } from './types';
import { Row } from './Row';
import { ColumnSelector } from './plugins/ColumnSelector';
import { Export } from './plugins/Export';
import { Column } from './Column';
import { Pagination } from './plugins/Pagination';
import { Tree } from './plugins/Tree';
import { Toolbar } from './Toolbar';
import { Filter } from './plugins/Filter';
import { StickyHeader } from './plugins/StickyHeader';
import { DefaultQuery } from './plugins/DefaultQuery';
import { Checkbox } from './plugins/Checkbox';

import { checkboxReducer } from './plugins/Checkbox/checkboxReducer';
import { columnSelectorReducer } from './plugins/ColumnSelector/columnSelectorReducer';
import { defaultQueryReducer } from './plugins/DefaultQuery/defaultQueryReducer';
import { oDataQueryReducer } from './plugins/ODataQuery/oDataQueryReducer';
import { paginationReducer } from './plugins/Pagination/paginationReducer';
import { sortingReducer } from './plugins/sortingReducer';
import { stickyHeaderReducer } from './plugins/StickyHeader/stickyHeaderReducer';

type DataTableCompound = typeof BaseDataTable & {
    Checkbox: typeof Checkbox
    Column: typeof Column
    ColumnSelector: typeof ColumnSelector
    DefaultQuery: typeof DefaultQuery
    Export: typeof Export
    Filter: typeof Filter
    Pagination: typeof Pagination
    Row: typeof Row
    StickyHeader: typeof StickyHeader
    Toolbar: typeof Toolbar
    Tree: typeof Tree
}

const DataTable = BaseDataTable as DataTableCompound

DataTable.Checkbox = Checkbox
DataTable.Column = Column
DataTable.ColumnSelector = ColumnSelector
DataTable.DefaultQuery = DefaultQuery
DataTable.Export = Export
DataTable.Filter = Filter
DataTable.Pagination = Pagination
DataTable.Row = Row
DataTable.StickyHeader = StickyHeader
DataTable.Toolbar = Toolbar
DataTable.Tree = Tree

DataTable.Checkbox.displayName = 'DataTable.Checkbox'
DataTable.Column.displayName = 'DataTable.Column'
DataTable.ColumnSelector.displayName = 'DataTable.ColumnSelector'
DataTable.DefaultQuery.displayName = 'DataTable.DefaultQuery'
DataTable.Export.displayName = 'DataTable.Export'
DataTable.Filter.displayName = 'DataTable.Filter'
DataTable.Pagination.displayName = 'DataTable.Pagination'
DataTable.Row.displayName = 'DataTable.Row'
DataTable.StickyHeader.displayName = 'DataTable.StickyHeader'
DataTable.Toolbar.displayName = 'DataTable.Toolbar'
DataTable.Tree.displayName = 'DataTable.Tree'

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