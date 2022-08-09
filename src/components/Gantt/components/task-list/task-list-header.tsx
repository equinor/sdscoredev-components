import React from 'react';
import {
    GanttTable,
    GanttTable_Header,
    GanttTable_HeaderItem,
    GanttTable_HeaderSeparator,
} from './task-list-header.style';

export const TaskListHeaderDefault: React.FC<{
    headerHeight: number;
    rowWidth: string;
    fontFamily: string;
    fontSize: string;
}> = ({ headerHeight, fontFamily, fontSize, rowWidth }) => {
    return (
        <GanttTable
            style={{
                fontFamily: fontFamily,
                fontSize: fontSize,
            }}
        >
            <GanttTable_Header
                style={{
                    height: headerHeight - 2,
                }}
            >
                <GanttTable_HeaderItem
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
                </GanttTable_HeaderItem>
            </GanttTable_Header>
        </GanttTable>
    );
};
