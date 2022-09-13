/* eslint-disable no-plusplus */
import { StateContext } from 'components/Gantt/GanttStore';
import React, { ReactChild, useContext } from 'react';
import styled from 'styled-components';
import { ViewMode } from 'types';

import {
    getCachedDateTimeFormat,
    getDaysInMonth,
    getLocalDayOfWeek,
    getLocaleMonth,
    getWeekNumberISO8601,
} from '../../helpers/date-helper';
import { LOCALE } from '../../types/public-types';
import { Section } from './Section';

export const CalendarBottomText = styled.text`
    text-anchor: middle;
    fill: #333;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: none;
`;

export const CalendarHeader = styled.rect`
    fill: #f7f7f7;
`;

export type CalendarProps = {
    viewMode: ViewMode;
};

export const Calendar: React.FC<CalendarProps> = ({ viewMode }) => {
    const state: any = useContext(StateContext);
    const { headerHeight } = state.ganttReducer;
    const { tickWidth } = state.gridReducer;

    const getCalendarValuesForYear = () => {
        const topValues: ReactChild[] = [];
        const bottomValues: ReactChild[] = [];

        for (let i = 0; i < state.ganttReducer.dates.length; i++) {
            const date = state.ganttReducer.dates[i];
            const bottomValue = date.getFullYear();

            const uuid = crypto.randomUUID();

            bottomValues.push(
                <Section
                    value={bottomValue}
                    key={bottomValue + uuid}
                    x1Line={tickWidth * i}
                    y1Line={0}
                    y2Line={headerHeight}
                    yText={headerHeight * 0.8}
                    xText={tickWidth * i + tickWidth * 0.5}
                />,
            );
        }
        return [topValues, bottomValues];
    };

    const getCalendarValuesForPartOfYear = () => {
        const topValues: ReactChild[] = [];
        const bottomValues: ReactChild[] = [];
        const ticks = viewMode === ViewMode.HalfYear ? 2 : 4;
        const topDefaultHeight = headerHeight * 0.5;
        const { dates } = state.ganttReducer;
        for (let i = 0; i < dates.length; i++) {
            const date = dates[i];
            const bottomValue = new Date(date).getMonth();

            bottomValues.push(
                <Section
                    key={date.getTime()}
                    value={`${bottomValue}`}
                    x1Line={tickWidth * i}
                    y1Line={headerHeight / 2}
                    y2Line={headerHeight}
                    yText={headerHeight * 0.8}
                    xText={tickWidth * i + tickWidth * 0.5}
                />,
            );

            const uuid = crypto.randomUUID();

            if (i === 0 || date.getFullYear() !== dates[i - 1].getFullYear()) {
                topValues.push(
                    <Section
                        key={date.getFullYear() + uuid}
                        value={date.getFullYear()}
                        x1Line={tickWidth * i}
                        y1Line={0}
                        y2Line={topDefaultHeight}
                        xText={tickWidth * i + ticks * tickWidth * 0.5}
                        yText={topDefaultHeight * 0.9}
                    />,
                );
            }
        }

        return [topValues, bottomValues];
    };

    const getCalendarValuesForMonth = () => {
        const topValues: ReactChild[] = [];
        const bottomValues: ReactChild[] = [];
        const topDefaultHeight = headerHeight * 0.5;
        for (let i = 0; i < state.ganttReducer.dates.length; i++) {
            const date = state.ganttReducer.dates[i];
            const bottomValue = getLocaleMonth(date);

            const uuid = crypto.randomUUID();

            bottomValues.push(
                <Section
                    value={`${bottomValue}`}
                    key={bottomValue + date.getFullYear() + uuid}
                    x1Line={tickWidth * i}
                    y1Line={headerHeight / 2}
                    y2Line={headerHeight}
                    yText={headerHeight * 0.8}
                    xText={tickWidth * i + tickWidth * 0.5}
                />,
            );
            if (i === 0 || date.getFullYear() !== state.ganttReducer.dates[i - 1].getFullYear()) {
                const topValue = date.getFullYear().toString();

                const xText: number = (6 + i - date.getMonth()) * tickWidth;

                topValues.push(
                    <Section
                        key={topValue}
                        value={topValue}
                        x1Line={tickWidth * i}
                        y1Line={0}
                        y2Line={topDefaultHeight}
                        xText={xText}
                        yText={topDefaultHeight * 0.9}
                    />,
                );
            }
        }
        return [topValues, bottomValues];
    };

    const getCalendarValuesForWeek = () => {
        const topValues: ReactChild[] = [];
        const bottomValues: ReactChild[] = [];
        let weeksCount: number = 1;
        const topDefaultHeight = headerHeight * 0.5;
        const { dates } = state.ganttReducer;
        for (let i = dates.length - 1; i >= 0; i--) {
            const date = dates[i];
            let topValue = '';
            if (i === 0 || date.getMonth() !== dates[i - 1].getMonth()) {
                // top
                topValue = `${getLocaleMonth(date)}, ${date.getFullYear()}`;
            }
            // bottom
            const bottomValue = `W${getWeekNumberISO8601(date)}`;

            bottomValues.push(
                <Section
                    value={`${bottomValue}`}
                    key={date.getTime()}
                    x1Line={tickWidth * i}
                    y1Line={headerHeight / 2}
                    y2Line={headerHeight}
                    yText={headerHeight * 0.8}
                    xText={tickWidth * i + tickWidth * 0.5}
                />,
            );

            if (topValue) {
                // if last day is new month
                if (i !== dates.length - 1) {
                    topValues.push(
                        <Section
                            key={topValue}
                            value={topValue}
                            x1Line={tickWidth * i + weeksCount * tickWidth}
                            y1Line={0}
                            y2Line={topDefaultHeight}
                            xText={tickWidth * i + tickWidth * weeksCount * 0.5}
                            yText={topDefaultHeight * 0.9}
                        />,
                    );
                }
                weeksCount = 0;
            }
            weeksCount++;
        }
        return [topValues, bottomValues];
    };

    const getCalendarValuesForDay = () => {
        const topValues: ReactChild[] = [];
        const bottomValues: ReactChild[] = [];
        const topDefaultHeight = headerHeight * 0.5;
        const { dates } = state.ganttReducer;
        for (let i = 0; i < dates.length; i++) {
            const date = dates[i];
            const bottomValue = `${getLocalDayOfWeek(date, 'short')}, ${date.getDate().toString()}`;

            bottomValues.push(
                <Section
                    value={`${bottomValue}`}
                    key={date.getTime()}
                    x1Line={tickWidth * i}
                    y1Line={headerHeight / 2}
                    y2Line={headerHeight}
                    yText={headerHeight * 0.8}
                    xText={tickWidth * i + tickWidth * 0.5}
                />,
            );
            if (i + 1 !== dates.length && date.getMonth() !== dates[i + 1].getMonth()) {
                const topValue = getLocaleMonth(date);

                topValues.push(
                    <Section
                        key={topValue + date.getFullYear()}
                        value={topValue}
                        x1Line={tickWidth * (i + 1)}
                        y1Line={0}
                        y2Line={topDefaultHeight}
                        xText={
                            tickWidth * (i + 1) - getDaysInMonth(date.getMonth(), date.getFullYear()) * tickWidth * 0.5
                        }
                        yText={topDefaultHeight * 0.9}
                    />,
                );
            }
        }
        return [topValues, bottomValues];
    };

    const getCalendarValuesForPartOfDay = () => {
        const topValues: ReactChild[] = [];
        const bottomValues: ReactChild[] = [];
        const ticks = state.ganttReducer.viewMode === ViewMode.HalfDay ? 2 : 4;
        const topDefaultHeight = headerHeight * 0.5;
        const { dates } = state.ganttReducer;
        for (let i = 0; i < dates.length; i++) {
            const date = dates[i];
            const bottomValue = getCachedDateTimeFormat(LOCALE, {
                hour: 'numeric',
            }).format(date);

            bottomValues.push(
                <CalendarBottomText key={date.getTime()} y={headerHeight * 0.8} x={tickWidth * i}>
                    {bottomValue}
                </CalendarBottomText>,
            );
            if (i === 0 || date.getDate() !== dates[i - 1].getDate()) {
                const topValue = `${getLocalDayOfWeek(date, 'short')}, ${date.getDate()} ${getLocaleMonth(date)}`;
                topValues.push(
                    <Section
                        key={topValue + date.getFullYear()}
                        value={topValue}
                        x1Line={tickWidth * i + ticks * tickWidth}
                        y1Line={0}
                        y2Line={topDefaultHeight}
                        xText={tickWidth * i + ticks * tickWidth * 0.5}
                        yText={topDefaultHeight * 0.9}
                    />,
                );
            }
        }

        return [topValues, bottomValues];
    };

    const getCalendarValuesForHour = () => {
        const topValues: ReactChild[] = [];
        const bottomValues: ReactChild[] = [];
        const topDefaultHeight = headerHeight * 0.5;
        const { dates } = state.ganttReducer;
        for (let i = 0; i < dates.length; i++) {
            const date = dates[i];
            const bottomValue = getCachedDateTimeFormat(LOCALE, {
                hour: 'numeric',
            }).format(date);

            bottomValues.push(
                <CalendarBottomText key={date.getTime()} y={headerHeight * 0.8} x={tickWidth * i}>
                    {bottomValue}
                </CalendarBottomText>,
            );
            if (i !== 0 && date.getDate() !== dates[i - 1].getDate()) {
                const displayDate = dates[i - 1];
                const topValue = `${getLocalDayOfWeek(displayDate, 'long')}, ${displayDate.getDate()} ${getLocaleMonth(
                    displayDate,
                )}`;
                const topPosition = (date.getHours() - 24) / 2;
                topValues.push(
                    <Section
                        key={topValue + displayDate.getFullYear()}
                        value={topValue}
                        x1Line={tickWidth * i}
                        y1Line={0}
                        y2Line={topDefaultHeight}
                        xText={tickWidth * (i + topPosition)}
                        yText={topDefaultHeight * 0.9}
                    />,
                );
            }
        }

        return [topValues, bottomValues];
    };

    let topValues: ReactChild[] = [];
    let bottomValues: ReactChild[] = [];
    switch (viewMode) {
        case ViewMode.Year:
            [topValues, bottomValues] = getCalendarValuesForYear();
            break;
        case ViewMode.HalfYear:
        case ViewMode.QuarterYear:
            [topValues, bottomValues] = getCalendarValuesForPartOfYear();
            break;
        case ViewMode.Month:
            [topValues, bottomValues] = getCalendarValuesForMonth();
            break;
        case ViewMode.Week:
            [topValues, bottomValues] = getCalendarValuesForWeek();
            break;
        case ViewMode.Day:
            [topValues, bottomValues] = getCalendarValuesForDay();
            break;
        case ViewMode.QuarterDay:
        case ViewMode.HalfDay:
            [topValues, bottomValues] = getCalendarValuesForPartOfDay();
            break;
        case ViewMode.Hour:
            [topValues, bottomValues] = getCalendarValuesForHour();
            break;
        default:
    }

    if (!state.ganttReducer.dates) return <></>;
    return (
        <svg
            id="gantt-calendar"
            xmlns="http://www.w3.org/2000/svg"
            width={state.ganttReducer.dates.length * state.gridReducer.tickWidth}
            height={state.ganttReducer.headerHeight}
            style={{
                fontFamily: 'Equinor',
                fontSize: '12px',
                borderBottom: '2px solid #dcdcdc',
                fontWeight: 500,
            }}
        >
            <g className="calendar">
                <CalendarHeader x={0} y={0} width={tickWidth * state.ganttReducer.dates.length} height={headerHeight} />
                {bottomValues} {topValues}
            </g>
        </svg>
    );
};
