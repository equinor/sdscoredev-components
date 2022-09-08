import React from 'react';

/**
 * Round up a number
 *
 * @param num
 * @param precision
 * @returns
 */
export const roundUp = (num: number, precision: number) => {
    // eslint-disable-next-line no-param-reassign
    precision = 10 ** precision;
    return Math.ceil(num * precision) / precision;
};

/**
 * Provide amount of months between two dates
 *
 * @param d1
 * @param d2
 * @returns
 */
export const monthDiff = (d1: Date, d2: Date) => {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
};

/**
 * Provide tick index based on the focued date
 *
 * @param focusDate
 * @param dates
 * @returns number
 */
export const getTickIndex = (focusDate: Date | string, dates: Array<Date>): number => {
    return dates.findIndex(
        (date: any, i: any) =>
            new Date(focusDate).valueOf() >= date.valueOf() &&
            i + 1 !== dates.length &&
            new Date(focusDate).valueOf() < dates[i + 1].valueOf(),
    );
};
