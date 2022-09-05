import { StateContext } from 'components/Gantt/GanttStore';
import React, { useContext } from 'react';
import styled from 'styled-components';

export const GanttTable = styled.div`
    display: table;
    border-bottom: #e6e4e4 1px solid;
    border-top: #e6e4e4 1px solid;
    border-left: #e6e4e4 1px solid;
`;
export const GanttTableHeader = styled.div`
    display: table-row;
    list-style: none;
`;
export const GanttTableHeaderSeparator = styled.div`
    border-right: 1px solid rgb(196, 196, 196);
    opacity: 1;
    margin-left: -2px;
`;
export const GanttTableHeaderItem = styled.div`
    display: table-cell;
    vertical-align: -webkit-baseline-middle;
    vertical-align: middle;
`;

export const TaskListHeader: React.FC<{
    rowWidth: string;
}> = ({ rowWidth }) => {
    const state: any = useContext(StateContext);
    const { headerHeight } = state.ganttReducer;

    return (
        <GanttTable>
            <GanttTableHeader
                style={{
                    height: headerHeight - 2,
                }}
            >
                {/* <GanttTable_HeaderItem
                    style={{
                        minWidth: rowWidth,
                    }}
                >
                    &nbsp;Name
                </GanttTable_HeaderItem>
                <GanttTable_HeaderSeparator
                    style={{
                        height: headerHeight * 0.5,
                        marginTop: headerHeight * 0.2,
                    }}
                />
                <GanttTable_HeaderItem
                    style={{
                        minWidth: rowWidth,
                    }}
                >
                    &nbsp;From
                </GanttTable_HeaderItem>
                <GanttTable_HeaderSeparator
                    style={{
                        height: headerHeight * 0.5,
                        marginTop: headerHeight * 0.25,
                    }}
                />
                <GanttTable_HeaderItem
                    style={{
                        minWidth: rowWidth,
                    }}
                >
                    &nbsp;To
                </GanttTable_HeaderItem> */}
            </GanttTableHeader>
        </GanttTable>
    );
};
