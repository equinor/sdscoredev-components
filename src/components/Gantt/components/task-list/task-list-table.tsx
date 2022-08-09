import React, { useMemo } from 'react';
import { Task } from '../../types/public-types';
import {
    TaskListCell,
    TaskListExpander,
    TaskListNameWrapper,
    TaskListTableRow,
    TaskListWrapper,
} from './task-list-table.style';

const localeDateStringCache = {};
const toLocaleDateStringFactory = (locale: string) => (date: Date, dateTimeOptions: Intl.DateTimeFormatOptions) => {
    const key = date.toString();
    let lds = localeDateStringCache[key];
    if (!lds) {
        lds = date.toLocaleDateString(locale, dateTimeOptions);
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
    rowHeight: number;
    rowWidth: string;
    fontFamily: string;
    fontSize: string;
    locale: string;
    tasks: Task[];
    selectedTaskId: string;
    setSelectedTask: (taskId: string) => void;
    onExpanderClick: (task: Task) => void;
}> = ({ rowHeight, rowWidth, tasks, fontFamily, fontSize, locale, onExpanderClick }) => {
    const toLocaleDateString = useMemo(() => toLocaleDateStringFactory(locale), [locale]);

    return (
        <TaskListWrapper
            style={{
                fontFamily: fontFamily,
                fontSize: fontSize,
            }}
        >
            {tasks.map((t) => {
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
                            &nbsp;{toLocaleDateString(t.dates[0], dateTimeOptions)}
                        </TaskListCell>
                        <TaskListCell
                            style={{
                                minWidth: rowWidth,
                                maxWidth: rowWidth,
                            }}
                        >
                            &nbsp;{toLocaleDateString(t.dates[t.dates.length - 1], dateTimeOptions)}
                        </TaskListCell>
                    </TaskListTableRow>
                );
            })}
        </TaskListWrapper>
    );
};
