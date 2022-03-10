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
declare type DataTableCompound = typeof BaseDataTable & {
    Row: typeof Row;
    ColumnSelector: typeof ColumnSelector;
    Export: typeof Export;
    Column: typeof Column;
    Pagination: typeof Pagination;
    Toolbar: typeof Toolbar;
    Filter: typeof Filter;
    StickyHeader: typeof StickyHeader;
};
declare const DataTable: DataTableCompound;
export { DataTable, checkboxReducer, columnSelectorReducer, defaultQueryReducer, oDataQueryReducer, paginationReducer, sortingReducer, stickyHeaderReducer, };
export type { DataTableProps, CustomRenderProps };
