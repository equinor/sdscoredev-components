import { StateContext } from 'components/Gantt/GanttStore';
import { BarTask } from 'components/Gantt/types/bar-task';
import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import { LOCALE, Task } from '../../types/public-types';

export const TaskListWrapper = styled.div`
    display: table;
    border-bottom: #e6e4e4 1px solid;
    border-left: #e6e4e4 1px solid;
`;

export const TaskListTableRow = styled.div`
    display: table-row;
    text-overflow: ellipsis;
    &:nth-of-type(even) {
        background-color: #f5f5f5;
    }
`;
export const TaskListCell = styled.div`
    display: table-cell;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

export const TaskListTableDefault: React.FC<{
    tasks: Task[];
    rowHeight: number;
    rowWidth: string;
    selectedTaskId: string;
    setSelectedTask: (taskId: string) => void;
    onExpanderClick: (task: Task) => void;
}> = ({ tasks, rowHeight, rowWidth, onExpanderClick }) => {
    const toLocaleDateString = useMemo(() => toLocaleDateStringFactory(), [LOCALE]);
    const state: any = useContext(StateContext);

    return (
        <TaskListWrapper>
            {tasks.map((t: Task) => {
                let expanderSymbol = '';
                if (t.hideChildren === false) {
                    expanderSymbol = '▼';
                } else if (t.hideChildren === true) {
                    expanderSymbol = '▶';
                }

                return (
                    <TaskListTableRow style={{ height: rowHeight }} key={`${t.id}row`}>
                        <TaskListCell
                            style={{
                                minWidth: rowWidth,
                                maxWidth: rowWidth,
                            }}
                            title={t.name}
                        >
                            <TaskListNameWrapper>
                                <TaskListExpander empty={!expanderSymbol} onClick={() => onExpanderClick(t)}>
                                    {expanderSymbol}
                                </TaskListExpander>
                                <div>{t.name}</div>
                            </TaskListNameWrapper>
                        </TaskListCell>
                        <TaskListCell
                            style={{
                                minWidth: rowWidth,
                                maxWidth: rowWidth,
                            }}
                        >
                            &nbsp;{toLocaleDateString(t.start, dateTimeOptions)}
                        </TaskListCell>
                        <TaskListCell
                            style={{
                                minWidth: rowWidth,
                                maxWidth: rowWidth,
                            }}
                        >
                            &nbsp;{toLocaleDateString(t.end, dateTimeOptions)}
                        </TaskListCell>
                    </TaskListTableRow>
                );
            })}
        </TaskListWrapper>
    );
};
