/* eslint-disable no-plusplus */
import React, { useContext, useEffect, useRef } from 'react';
import { ViewMode } from '../../../../types';
import { StateContext } from '../../GanttStore';
import { getLocaleMonth, getWeekNumberISO8601 } from '../../helpers/date-helper';

export type CalendarProps = {
    viewMode: ViewMode;
};

export const Calendar: React.FC<CalendarProps> = ({ viewMode }) => {
    const state: any = useContext(StateContext);
    let { headerHeight } = state.ganttReducer;
    const { tickWidth } = state.gridReducer;
    const canvas = useRef<HTMLCanvasElement>(null);

    const daysInMonth = (month: any, year: any) => {
        return new Date(year, month, 0).getDate();
    };

    headerHeight -= 2;
    const width = state.ganttReducer.dates.length * tickWidth;

    const getCalendarValuesForYear = (ctx: any) => {
        ctx.beginPath();
        for (let i = 0; i < state.ganttReducer.dates.length; i++) {
            const p1 = { x: tickWidth * i, y: i % 2 === 0 ? 0 : headerHeight };
            const p2 = { x: tickWidth * i, y: i % 2 !== 0 ? 0 : headerHeight };
            ctx.moveTo(p1.x + 0.5, p1.y);
            ctx.lineTo(p2.x + 0.5, p2.y);
        }
        ctx.strokeStyle = 'rgb(220,220,220)';
        ctx.lineWidth = 1;
        ctx.stroke();

        for (let i = 0; i < state.ganttReducer.dates.length; i++) {
            const date = state.ganttReducer.dates[i];
            const value = date.getFullYear();
            ctx.fillText(value, tickWidth * i + tickWidth * 0.5, headerHeight / 2);
        }
    };

    const getCalendarValuesForPartOfYear = (ctx: any) => {
        const ticks = viewMode === ViewMode.HalfYear ? 2 : 4;
        const { dates } = state.ganttReducer;
        const datesCount = dates.length;

        ctx.beginPath();
        for (let i = 0; i < datesCount; i++) {
            const p1 = { x: tickWidth * i, y: i % 2 === 0 ? headerHeight * 0.5 : headerHeight };
            const p2 = { x: tickWidth * i, y: i % 2 !== 0 ? headerHeight * 0.5 : headerHeight };
            ctx.moveTo(p1.x + 0.5, p1.y);
            ctx.lineTo(p2.x + 0.5, p2.y);
        }
        for (let i = 0; i < datesCount / ticks; i++) {
            const p1 = { x: tickWidth * i * ticks, y: i % 2 === 0 ? 0 : headerHeight * 0.5 };
            const p2 = { x: tickWidth * i * ticks, y: i % 2 !== 0 ? 0 : headerHeight * 0.5 };
            ctx.moveTo(p1.x + 0.5, p1.y);
            ctx.lineTo(p2.x + 0.5, p2.y);
        }
        ctx.strokeStyle = 'rgb(220,220,220)';
        ctx.lineWidth = 1;
        ctx.stroke();

        for (let i = 0; i < datesCount; i++) {
            const date = dates[i];
            const value = new Date(date).getMonth();
            ctx.fillText(value, tickWidth * i + tickWidth * 0.5, headerHeight * 0.75);
        }
        for (let i = 0; i < datesCount / ticks; i++) {
            const date = dates[i * ticks];
            const value = new Date(date).getFullYear();
            ctx.fillText(value, tickWidth * i * ticks + tickWidth * ticks * 0.5, headerHeight * 0.25);
        }
    };

    const getCalendarValuesForMonth = (ctx: any) => {
        const { dates } = state.ganttReducer;
        const datesCount = dates.length;

        ctx.beginPath();
        for (let i = 0; i < datesCount; i++) {
            const p1 = { x: tickWidth * i, y: i % 2 === 0 ? headerHeight * 0.5 : headerHeight };
            const p2 = { x: tickWidth * i, y: i % 2 !== 0 ? headerHeight * 0.5 : headerHeight };
            ctx.moveTo(p1.x + 0.5, p1.y);
            ctx.lineTo(p2.x + 0.5, p2.y);
        }
        for (let i = 0; i < datesCount / 12; i++) {
            const p1 = { x: tickWidth * i * 12 - tickWidth * 5, y: i % 2 === 0 ? 0 : headerHeight * 0.5 };
            const p2 = { x: tickWidth * i * 12 - tickWidth * 5, y: i % 2 !== 0 ? 0 : headerHeight * 0.5 };
            ctx.moveTo(p1.x + 0.5, p1.y);
            ctx.lineTo(p2.x + 0.5, p2.y);
        }

        ctx.strokeStyle = 'rgb(220,220,220)';
        ctx.lineWidth = 1;
        ctx.stroke();

        for (let i = 0; i < datesCount; i++) {
            const date = dates[i];
            const value = getLocaleMonth(date);
            ctx.fillText(value, tickWidth * i + tickWidth * 0.5, headerHeight * 0.75);
        }
        for (let i = 0; i < datesCount / 12; i++) {
            const date = dates[i * 12 + 1];
            const value = new Date(date).getFullYear();
            ctx.fillText(value, tickWidth * i * 12 + tickWidth, headerHeight * 0.25);
        }
    };

    const getCalendarValuesForWeek = (ctx: any) => {
        const { dates } = state.ganttReducer;
        const datesCount = dates.length;

        ctx.beginPath();
        for (let i = 0; i < datesCount; i++) {
            const p1 = { x: tickWidth * i, y: i % 2 === 0 ? headerHeight * 0.5 : headerHeight };
            const p2 = { x: tickWidth * i, y: i % 2 !== 0 ? headerHeight * 0.5 : headerHeight };
            ctx.moveTo(p1.x + 0.5, p1.y);
            ctx.lineTo(p2.x + 0.5, p2.y);
        }

        ctx.strokeStyle = 'rgb(220,220,220)';
        ctx.lineWidth = 1;
        ctx.stroke();

        for (let i = 0; i < datesCount; i++) {
            const date = dates[i];
            const value = `W${getWeekNumberISO8601(date)}`;
            ctx.fillText(value, tickWidth * i + tickWidth * 0.5, headerHeight * 0.75);
        }
        for (let i = 0; i < datesCount; i++) {
            const date = dates[i];
            if (i === 0 || date.getMonth() !== dates[i - 1].getMonth()) {
                const value = `${getLocaleMonth(date)}, ${date.getFullYear()}`;
                ctx.fillText(value, tickWidth * i + tickWidth * 0.5, headerHeight * 0.25);
            }
        }
    };

    const getCalendarValuesForDay = (ctx: any) => {
        const { dates } = state.ganttReducer;
        const datesCount = dates.length;

        ctx.beginPath();
        for (let i = 0; i < datesCount; i++) {
            const p1 = { x: tickWidth * i, y: i % 2 === 0 ? headerHeight * 0.5 : headerHeight };
            const p2 = { x: tickWidth * i, y: i % 2 !== 0 ? headerHeight * 0.5 : headerHeight };
            ctx.moveTo(p1.x + 0.5, p1.y);
            ctx.lineTo(p2.x + 0.5, p2.y);
        }
        for (let i = 0; i < datesCount; i++) {
            const date = dates[i];
            if (i + 1 !== dates.length && date.getMonth() !== dates[i + 1].getMonth()) {
                const p1 = { x: tickWidth * i + tickWidth, y: i % 2 === 0 ? 0 : headerHeight * 0.5 };
                const p2 = { x: tickWidth * i + tickWidth, y: i % 2 !== 0 ? 0 : headerHeight * 0.5 };
                ctx.moveTo(p1.x + 0.5, p1.y);
                ctx.lineTo(p2.x + 0.5, p2.y);
            }
        }

        ctx.strokeStyle = 'rgb(220,220,220)';
        ctx.lineWidth = 1;
        ctx.stroke();

        for (let i = 0; i < datesCount; i++) {
            const date = dates[i];
            const value = `${date.getDate().toString()}`;
            ctx.fillText(value, tickWidth * i + tickWidth * 0.5, headerHeight * 0.75);
        }
        for (let i = 0; i < datesCount; i++) {
            const date = dates[i];
            if (i + 1 !== dates.length && date.getMonth() !== dates[i + 1].getMonth()) {
                const days = daysInMonth(date.getMonth(), date.getYear());
                const value = getLocaleMonth(date);
                ctx.fillText(value, tickWidth * i + tickWidth * 0.5 - (tickWidth * days) / 2, headerHeight * 0.25);
            }
        }
    };

    // const getCalendarValuesForPartOfDay = () => {
    //     const topValues: ReactChild[] = [];
    //     const bottomValues: ReactChild[] = [];
    //     const ticks = state.ganttReducer.viewMode === ViewMode.HalfDay ? 2 : 4;
    //     const topDefaultHeight = headerHeight * 0.5;
    //     const { dates } = state.ganttReducer;
    //     for (let i = 0; i < dates.length; i++) {
    //         const date = dates[i];
    //         const bottomValue = getCachedDateTimeFormat(LOCALE, {
    //             hour: 'numeric',
    //         }).format(date);

    //         bottomValues.push(
    //             <CalendarBottomText key={date.getTime()} y={headerHeight * 0.8} x={tickWidth * i}>
    //                 {bottomValue}
    //             </CalendarBottomText>,
    //         );
    //         if (i === 0 || date.getDate() !== dates[i - 1].getDate()) {
    //             const topValue = `${getLocalDayOfWeek(date, 'short')}, ${date.getDate()} ${getLocaleMonth(date)}`;
    //             topValues.push(
    //                 <Section
    //                     key={topValue + date.getFullYear()}
    //                     value={topValue}
    //                     x1Line={tickWidth * i + ticks * tickWidth}
    //                     y1Line={0}
    //                     y2Line={topDefaultHeight}
    //                     xText={tickWidth * i + ticks * tickWidth * 0.5}
    //                     yText={topDefaultHeight * 0.9}
    //                 />,
    //             );
    //         }
    //     }

    //     return [topValues, bottomValues];
    // };

    // const getCalendarValuesForHour = () => {
    //     const topValues: ReactChild[] = [];
    //     const bottomValues: ReactChild[] = [];
    //     const topDefaultHeight = headerHeight * 0.5;
    //     const { dates } = state.ganttReducer;
    //     for (let i = 0; i < dates.length; i++) {
    //         const date = dates[i];
    //         const bottomValue = getCachedDateTimeFormat(LOCALE, {
    //             hour: 'numeric',
    //         }).format(date);

    //         bottomValues.push(
    //             <CalendarBottomText key={date.getTime()} y={headerHeight * 0.8} x={tickWidth * i}>
    //                 {bottomValue}
    //             </CalendarBottomText>,
    //         );
    //         if (i !== 0 && date.getDate() !== dates[i - 1].getDate()) {
    //             const displayDate = dates[i - 1];
    //             const topValue = `${getLocalDayOfWeek(displayDate, 'long')}, ${displayDate.getDate()} ${getLocaleMonth(
    //                 displayDate,
    //             )}`;
    //             const topPosition = (date.getHours() - 24) / 2;
    //             topValues.push(
    //                 <Section
    //                     key={topValue + displayDate.getFullYear()}
    //                     value={topValue}
    //                     x1Line={tickWidth * i}
    //                     y1Line={0}
    //                     y2Line={topDefaultHeight}
    //                     xText={tickWidth * (i + topPosition)}
    //                     yText={topDefaultHeight * 0.9}
    //                 />,
    //             );
    //         }
    //     }

    //     return [topValues, bottomValues];
    // };

    useEffect(() => {
        if (!canvas.current) return;

        canvas.current.style.background = 'rgb(247,247,247)';

        // console.warn('Canvas width is limited to 65200. Your canvas width is: ' + width);
        canvas.current.width = width > 65200 ? 65200 : width;
        const ctx = canvas.current.getContext('2d', { alpha: false });

        if (ctx) {
            ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
            ctx.fillStyle = 'rgb(247,247,247)';
            ctx.fillRect(0, 0, width, headerHeight);
            ctx.font = '14px Equinor';
            ctx.fillStyle = 'rgb(61,61,61)';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';

            if (viewMode.valueOf() === ViewMode.Year) getCalendarValuesForYear(ctx);
            if (viewMode.valueOf() === ViewMode.HalfYear || viewMode.valueOf() === ViewMode.QuarterYear)
                getCalendarValuesForPartOfYear(ctx);
            if (viewMode.valueOf() === ViewMode.Month) getCalendarValuesForMonth(ctx);
            if (viewMode.valueOf() === ViewMode.Week) getCalendarValuesForWeek(ctx);
            if (viewMode.valueOf() === ViewMode.Day) getCalendarValuesForDay(ctx);
            // if (viewMode.valueOf() === ViewMode.HalfDay || viewMode.valueOf() === ViewMode.QuarterDay)
            //     getCalendgetCalendarValuesForPartOfDayarValuesForDay(ctx);
            // if (viewMode.valueOf() === ViewMode.Hour) getCalendarValuesForHour(ctx);
        }
    }, [canvas.current, viewMode, tickWidth]);

    if (!state.ganttReducer.dates) return <></>;
    return (
        <canvas
            className="calendar"
            ref={canvas}
            id="calendar-canvas"
            height={state.ganttReducer.headerHeight - 2}
            style={{ borderBottom: '2px solid rgb(220,220,220)' }}
        />
    );
};
