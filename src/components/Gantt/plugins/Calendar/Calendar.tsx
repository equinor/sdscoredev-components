import React, { ReactChild, useContext } from 'react';
import { LOCALE, ViewMode } from '../../types/public-types';
import {
    getCachedDateTimeFormat,
    getDaysInMonth,
    getLocalDayOfWeek,
    getLocaleMonth,
    getWeekNumberISO8601,
} from '../../helpers/date-helper';
import { StateContext } from 'components/Gantt/GanttStore';
import styled from 'styled-components';
import { TopPartOfCalendar } from './top-part-of-calendar';

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

export const CalendarTopTick = styled.line`
    stroke: #e6e4e4;
`;

export const CalendarTopText = styled.text`
    text-anchor: middle;
    fill: #555;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: none;
`;

export const CalendarHeader = styled.rect`
    fill: #ffffff;
    stroke: #e0e0e0;
    stroke-width: 1.4;
`;

export type CalendarProps = {
    viewMode: ViewMode;
    columnWidth: number;
};

export const Calendar: React.FC<CalendarProps> = ({ viewMode, columnWidth }) => {
    const state: any = useContext(StateContext);
    const { headerHeight } = state.ganttReducer;

    const getCalendarValuesForMonth = () => {
        const topValues: ReactChild[] = [];
        const bottomValues: ReactChild[] = [];
        const topDefaultHeight = headerHeight * 0.5;
        for (let i = 0; i < state.ganttReducer.dates.length; i++) {
            const date = state.ganttReducer.dates[i];
            const bottomValue = getLocaleMonth(date);
            bottomValues.push(
                <CalendarBottomText
                    key={bottomValue + date.getFullYear()}
                    y={headerHeight * 0.8}
                    x={columnWidth * i + columnWidth * 0.5}
                >
                    {bottomValue}
                </CalendarBottomText>,
            );
            if (i === 0 || date.getFullYear() !== state.ganttReducer.dates[i - 1].getFullYear()) {
                const topValue = date.getFullYear().toString();
                let xText: number;

                xText = (6 + i - date.getMonth()) * columnWidth;

                topValues.push(
                    <TopPartOfCalendar
                        key={topValue}
                        value={topValue}
                        x1Line={columnWidth * i}
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
        const dates = state.ganttReducer.dates;
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
                <CalendarBottomText key={date.getTime()} y={headerHeight * 0.8} x={columnWidth * i}>
                    {bottomValue}
                </CalendarBottomText>,
            );

            if (topValue) {
                // if last day is new month
                if (i !== dates.length - 1) {
                    topValues.push(
                        <TopPartOfCalendar
                            key={topValue}
                            value={topValue}
                            x1Line={columnWidth * i + weeksCount * columnWidth}
                            y1Line={0}
                            y2Line={topDefaultHeight}
                            xText={columnWidth * i + columnWidth * weeksCount * 0.5}
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
        const dates = state.ganttReducer.dates;
        for (let i = 0; i < dates.length; i++) {
            const date = dates[i];
            const bottomValue = `${getLocalDayOfWeek(date, 'short')}, ${date.getDate().toString()}`;

            bottomValues.push(
                <CalendarBottomText key={date.getTime()} y={headerHeight * 0.8} x={columnWidth * i + columnWidth * 0.5}>
                    {bottomValue}
                </CalendarBottomText>,
            );
            if (i + 1 !== dates.length && date.getMonth() !== dates[i + 1].getMonth()) {
                const topValue = getLocaleMonth(date);

                topValues.push(
                    <TopPartOfCalendar
                        key={topValue + date.getFullYear()}
                        value={topValue}
                        x1Line={columnWidth * (i + 1)}
                        y1Line={0}
                        y2Line={topDefaultHeight}
                        xText={
                            columnWidth * (i + 1) -
                            getDaysInMonth(date.getMonth(), date.getFullYear()) * columnWidth * 0.5
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
        const ticks = viewMode === ViewMode.HalfDay ? 2 : 4;
        const topDefaultHeight = headerHeight * 0.5;
        const dates = state.ganttReducer.dates;
        for (let i = 0; i < dates.length; i++) {
            const date = dates[i];
            const bottomValue = getCachedDateTimeFormat(LOCALE, {
                hour: 'numeric',
            }).format(date);

            bottomValues.push(
                <CalendarBottomText key={date.getTime()} y={headerHeight * 0.8} x={columnWidth * i}>
                    {bottomValue}
                </CalendarBottomText>,
            );
            if (i === 0 || date.getDate() !== dates[i - 1].getDate()) {
                const topValue = `${getLocalDayOfWeek(date, 'short')}, ${date.getDate()} ${getLocaleMonth(date)}`;
                topValues.push(
                    <TopPartOfCalendar
                        key={topValue + date.getFullYear()}
                        value={topValue}
                        x1Line={columnWidth * i + ticks * columnWidth}
                        y1Line={0}
                        y2Line={topDefaultHeight}
                        xText={columnWidth * i + ticks * columnWidth * 0.5}
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
        const dates = state.ganttReducer.dates;
        for (let i = 0; i < dates.length; i++) {
            const date = dates[i];
            const bottomValue = getCachedDateTimeFormat(LOCALE, {
                hour: 'numeric',
            }).format(date);

            bottomValues.push(
                <CalendarBottomText key={date.getTime()} y={headerHeight * 0.8} x={columnWidth * i}>
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
                    <TopPartOfCalendar
                        key={topValue + displayDate.getFullYear()}
                        value={topValue}
                        x1Line={columnWidth * i}
                        y1Line={0}
                        y2Line={topDefaultHeight}
                        xText={columnWidth * (i + topPosition)}
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
    }
    return (
        <g className="calendar">
            <CalendarHeader x={0} y={0} width={columnWidth * state.ganttReducer.dates.length} height={headerHeight} />
            {bottomValues} {topValues}
        </g>
    );
};
