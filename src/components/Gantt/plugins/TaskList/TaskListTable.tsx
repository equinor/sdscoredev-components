import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import { StateContext } from '../../GanttStore';
import { Task } from '../../bars/types';
import { LOCALE } from '../../types/public-types';

export const TaskListWrapper = styled.div`
    display: table;
    border-bottom: #ebeff2 1px solid;
    border-right: #ebeff2 1px solid;
    width: 100%;
`;

export const TaskListTableRow = styled.div`
    display: table-row;
    text-overflow: ellipsis;
    border-right: #ebeff2 1px solid;

    /* Uncomment for stripes */
    /* &:nth-of-type(even) {
        background-color: #f5f5f5;
    } */
`;
export const TaskListCell = styled.div`
    display: table-cell;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-top: 1px solid #ebeff2;
`;
export const TaskListNameWrapper = styled.div`
    display: flex;
`;

export const TaskListExpander = styled.div<{ empty: boolean }>`
    color: rgb(86 86 86);
    font-size: 0.6rem;
    padding-left: ${(props: { empty: any }) => (props.empty ? '1rem' : 'unset')};
    padding: ${(props: { empty: any }) => (props.empty ? 'unset' : '0.15rem 0.2rem 0rem 0.2rem')};
    user-select: none;
    cursor: pointer;
`;

const localeDateStringCache = {};
const toLocaleDateStringFactory = () => (date: Date, dateTimeOptions: Intl.DateTimeFormatOptions) => {
    const key = date.toString();
    let lds = localeDateStringCache[key];
    if (!lds) {
        lds = date.toLocaleDateString(LOCALE, dateTimeOptions);
        localeDateStringCache[key] = lds;
    }
    return lds;
};
const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

export const TaskListTable: React.FC<{
    bars: Task[];
    render?: Function;
    rowHeight: number;
    rowWidth: string;
    selectedTaskId: string;
    setSelectedTask: (taskId: string) => void;
    onExpanderClick: (task: Task) => void;
}> = (props) => {
    const { bars, rowHeight, rowWidth, onExpanderClick, render } = props;
    const toLocaleDateString = useMemo(() => toLocaleDateStringFactory(), [LOCALE]);
    const state: any = useContext(StateContext);

    return (
        <TaskListWrapper>
            {bars.map((task: Task) => {
                let expanderSymbol = '';
                if (task.hideChildren === false) {
                    expanderSymbol = '▼';
                } else if (task.hideChildren === true) {
                    expanderSymbol = '▶';
                }

                if (render) {
                    return (
                        <TaskListTableRow style={{ height: rowHeight }} key={`${task.id}row`}>
                            {render({ task })}
                        </TaskListTableRow>
                    );
                }

                return (
                    <TaskListTableRow style={{ height: rowHeight }} key={`${task.id}row`}>
                        <TaskListCell
                            style={{
                                minWidth: rowWidth,
                                maxWidth: rowWidth,
                            }}
                            title={task.name}
                        >
                            <TaskListNameWrapper>
                                <TaskListExpander empty={!expanderSymbol} onClick={() => onExpanderClick(task)}>
                                    {expanderSymbol}
                                </TaskListExpander>
                                <div>{task.name}</div>
                            </TaskListNameWrapper>
                        </TaskListCell>
                        <TaskListCell
                            style={{
                                minWidth: rowWidth,
                                maxWidth: rowWidth,
                            }}
                        >
                            &nbsp;{toLocaleDateString(task.start, dateTimeOptions)}
                        </TaskListCell>
                        <TaskListCell
                            style={{
                                minWidth: rowWidth,
                                maxWidth: rowWidth,
                            }}
                        >
                            &nbsp;{toLocaleDateString(task.end, dateTimeOptions)}
                        </TaskListCell>
                    </TaskListTableRow>
                );
            })}
        </TaskListWrapper>
    );
};
