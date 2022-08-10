import React from 'react';
import { CalendarTopText, CalendarTopTick } from './Calendar';

type TopPartOfCalendarProps = {
    value: string;
    x1Line: number;
    y1Line: number;
    y2Line: number;
    xText: number;
    yText: number;
};

export const TopPartOfCalendar: React.FC<TopPartOfCalendarProps> = ({
    value,
    x1Line,
    y1Line,
    y2Line,
    xText,
    yText,
}) => {
    return (
        <g className="calendarTop">
            <CalendarTopTick x1={x1Line} y1={y1Line} x2={x1Line} y2={y2Line} key={value + 'line'} />
            <CalendarTopText key={value + 'text'} y={yText} x={xText}>
                {value}
            </CalendarTopText>
        </g>
    );
};
