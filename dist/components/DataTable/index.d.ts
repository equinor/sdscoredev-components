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
declare type DataTableCompound = typeof BaseDataTable & {
    Checkbox: typeof Checkbox;
    Column: typeof Column;
    ColumnSelector: typeof ColumnSelector;
    DefaultQuery: typeof DefaultQuery;
    Export: typeof Export;
    Filter: typeof Filter;
    Pagination: typeof Pagination;
    Row: typeof Row;
    StickyHeader: typeof StickyHeader;
    Toolbar: typeof Toolbar;
    Tree: typeof Tree;
};
declare const DataTable: DataTableCompound;
export { DataTable, checkboxReducer, columnSelectorReducer, defaultQueryReducer, oDataQueryReducer, paginationReducer, sortingReducer, stickyHeaderReducer, };
export type { DataTableProps, CustomRenderProps };
