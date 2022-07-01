import styled from 'styled-components';

export const GanttTable = styled.div`
    display: table;
    border-bottom: #e6e4e4 1px solid;
    border-top: #e6e4e4 1px solid;
    border-left: #e6e4e4 1px solid;
`;
export const GanttTable_Header = styled.div`
    display: table-row;
    list-style: none;
`;
export const GanttTable_HeaderSeparator = styled.div`
    border-right: 1px solid rgb(196, 196, 196);
    opacity: 1;
    margin-left: -2px;
`;
export const GanttTable_HeaderItem = styled.div`
    display: table-cell;
    vertical-align: -webkit-baseline-middle;
    vertical-align: middle;
`;
