import { ViewMode } from '../../../types';
import { Task } from '../bars/types';
import { LOCALE } from '../types/public-types';
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;
import DateTimeFormat = Intl.DateTimeFormat;

type DateHelperScales = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';

const intlDTCache = {};
export const getCachedDateTimeFormat = (
    locString: string | string[],
    opts: DateTimeFormatOptions = {},
): DateTimeFormat => {
    const key = JSON.stringify([locString, opts]);
    let dtf = intlDTCache[key];
    if (!dtf) {
        dtf = new Intl.DateTimeFormat(locString, opts);
        intlDTCache[key] = dtf;
    }
    return dtf;
};

/**
 * Adds a quantity (day, month, year) to a date
 * example:
 * ```
 * addToDate(Sun May 15 2022 00:00:00 GMT+0200, -1, 'month')
 * ```
 * will return a date set one month earlier
 * ```
 * Fri Apr 15 2022 00:00:00 GMT+0200
 * ```
 * @param date
 * @param quantity
 * @param scale
 * @returns
 */
export const addToDate = (date: Date, quantity: number, scale: DateHelperScales) => {
    let existingDate = date;
    if (typeof existingDate === 'string') {
        existingDate = new Date(date);
    }
    const newDate = new Date(
        existingDate.getFullYear() + (scale === 'year' ? quantity : 0),
        existingDate.getMonth() + (scale === 'month' ? quantity : 0),
        existingDate.getDate() + (scale === 'day' ? quantity : 0),
        existingDate.getHours() + (scale === 'hour' ? quantity : 0),
        existingDate.getMinutes() + (scale === 'minute' ? quantity : 0),
        existingDate.getSeconds() + (scale === 'second' ? quantity : 0),
        existingDate.getMilliseconds() + (scale === 'millisecond' ? quantity : 0),
    );
    return newDate;
};

/**
 * Sets the date to start of 'day', 'month', 'year' and so on.
 * example:
 * ```
 * startOfDate(Sun May 15 2022 00:00:00 GMT+0200, 'month')
 * ```
 * will return the beginning of the month
 * ```
 * Fri May 01 2022 00:00:00 GMT+0200
 * ```
 *
 * @param date Date
 * @param scale DateHelperScales
 * @returns Date
 */
export const startOfDate = (date: Date, scale: DateHelperScales) => {
    const scores = ['millisecond', 'second', 'minute', 'hour', 'day', 'month', 'year'];

    const shouldReset = (_scale: DateHelperScales) => {
        const maxScore = scores.indexOf(scale);
        return scores.indexOf(_scale) <= maxScore;
    };
    let existingDate = date;
    if (typeof existingDate === 'string') {
        existingDate = new Date(date);
    }
    const newDate = new Date(
        existingDate.getFullYear(),
        shouldReset('year') ? 0 : date.getMonth(),
        shouldReset('month') ? 1 : date.getDate(),
        shouldReset('day') ? 0 : date.getHours(),
        shouldReset('hour') ? 0 : date.getMinutes(),
        shouldReset('minute') ? 0 : date.getSeconds(),
        shouldReset('second') ? 0 : date.getMilliseconds(),
    );
    return newDate;
};

/**
 * Provides the start date and end date of
 * the total visible range based on the ViewMode
 *
 * @param tasks Visible tasks
 * @param viewMode
 * @returns [startDate, endDate]
 */
export const ganttDateRange = (tasks: Task[], viewMode: ViewMode) => {
    let { start } = tasks[0];
    let end: Date = tasks[0].start;

    // eslint-disable-next-line no-restricted-syntax
    for (const task of tasks) {
        if (task.start < start) {
            start = task.start;
        }
        if (task.end > end) {
            end = task.end;
        }
        /**
         * Check to see if nugget is present and recalculate the dates
         */
        if (task.nuggets) {
            // eslint-disable-next-line no-loop-func
            task.nuggets.forEach((nugget) => {
                if (nugget[1].start < start) {
                    start = nugget[1].start;
                }

                if (nugget[1].end > end) {
                    end = nugget[1].end;
                }
            });
        }
    }

    // eslint-disable-next-line default-case
    switch (viewMode) {
        case ViewMode.Year:
            start = addToDate(start, -1, 'year');
            start = startOfDate(start, 'year');
            end = addToDate(end, 1, 'year');
            end = startOfDate(end, 'year');
            break;
        case ViewMode.HalfYear:
            start = addToDate(start, -1, 'year');
            start = startOfDate(start, 'year');
            end = addToDate(end, 1, 'year');
            end = startOfDate(end, 'year');
            break;
        case ViewMode.QuarterYear:
            start = addToDate(start, -1, 'year');
            start = startOfDate(start, 'year');
            end = addToDate(end, 1, 'year');
            end = startOfDate(end, 'year');
            break;
        case ViewMode.Month:
            start = addToDate(start, -1, 'month');
            start = startOfDate(start, 'month');
            end = addToDate(end, 1, 'year');
            end = startOfDate(end, 'year');
            break;
        case ViewMode.Week:
            start = startOfDate(start, 'day');
            start = addToDate(getMonday(start), -7, 'day');
            end = startOfDate(end, 'day');
            end = addToDate(end, 1.5, 'month');
            break;
        case ViewMode.Day:
            start = startOfDate(start, 'day');
            start = addToDate(start, -1, 'day');
            end = startOfDate(end, 'day');
            end = addToDate(end, 19, 'day');
            break;
        case ViewMode.HalfDay:
            start = startOfDate(start, 'day');
            start = addToDate(start, -1, 'day');
            end = startOfDate(end, 'day');
            end = addToDate(end, 108, 'hour'); // 24(1 day)*5 - 12
            break;
        case ViewMode.QuarterDay:
            start = startOfDate(start, 'day');
            start = addToDate(start, -1, 'day');
            end = startOfDate(end, 'day');
            end = addToDate(end, 66, 'hour'); // 24(1 day)*3 - 6
            break;
        case ViewMode.Hour:
            start = startOfDate(start, 'hour');
            start = addToDate(start, -1, 'hour');
            end = startOfDate(end, 'day');
            end = addToDate(end, 1, 'day');
            break;
    }
    return [start, end];
};

export const seedDates = (startDate: Date, endDate: Date, viewMode: ViewMode) => {
    let currentDate: Date = new Date(startDate);
    const dates: Date[] = [currentDate];
    while (currentDate < endDate) {
        // eslint-disable-next-line default-case
        switch (viewMode) {
            case ViewMode.Year:
                currentDate = addToDate(currentDate, 1, 'year');
                break;
            case ViewMode.HalfYear:
                currentDate = addToDate(currentDate, 6, 'month');
                break;
            case ViewMode.QuarterYear:
                currentDate = addToDate(currentDate, 3, 'month');
                break;
            case ViewMode.Month:
                currentDate = addToDate(currentDate, 1, 'month');
                break;
            case ViewMode.Week:
                currentDate = addToDate(currentDate, 7, 'day');
                break;
            case ViewMode.Day:
                currentDate = addToDate(currentDate, 1, 'day');
                break;
            case ViewMode.HalfDay:
                currentDate = addToDate(currentDate, 12, 'hour');
                break;
            case ViewMode.QuarterDay:
                currentDate = addToDate(currentDate, 6, 'hour');
                break;
            case ViewMode.Hour:
                currentDate = addToDate(currentDate, 1, 'hour');
                break;
        }
        dates.push(currentDate);
    }
    return dates;
};

export const getLocaleMonth = (date: Date) => {
    let bottomValue = getCachedDateTimeFormat(LOCALE, {
        month: 'long',
    }).format(date);
    bottomValue = bottomValue.replace(bottomValue[0], bottomValue[0].toLocaleUpperCase());
    return bottomValue;
};

export const getLocalDayOfWeek = (date: Date, format?: 'long' | 'short' | 'narrow' | undefined) => {
    let bottomValue = getCachedDateTimeFormat(LOCALE, {
        weekday: format,
    }).format(date);
    bottomValue = bottomValue.replace(bottomValue[0], bottomValue[0].toLocaleUpperCase());
    return bottomValue;
};

/**
 * Returns monday of current week
 * @param date date for modify
 */
const getMonday = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(date.setDate(diff));
};

export const getWeekNumberISO8601 = (date: Date) => {
    const tmpDate = new Date(date.valueOf());
    const dayNumber = (tmpDate.getDay() + 6) % 7;
    tmpDate.setDate(tmpDate.getDate() - dayNumber + 3);
    const firstThursday = tmpDate.valueOf();
    tmpDate.setMonth(0, 1);
    if (tmpDate.getDay() !== 4) {
        tmpDate.setMonth(0, 1 + ((4 - tmpDate.getDay() + 7) % 7));
    }
    const weekNumber = (1 + Math.ceil((firstThursday - tmpDate.valueOf()) / 604800000)).toString();

    if (weekNumber.length === 1) {
        return `0${weekNumber}`;
    }
    return weekNumber;
};

export const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
};

export const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};
