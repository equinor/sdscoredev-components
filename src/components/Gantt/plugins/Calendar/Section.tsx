import React from 'react';
import styled from 'styled-components';

export const CalendarTick = styled.line`
    stroke: #e6e4e4;
`;

export const CalendarText = styled.text`
    text-anchor: middle;
    fill: #555;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: none;
`;

type SectionProps = {
    value: string;
    x1Line: number;
    y1Line: number;
    y2Line: number;
    xText: number;
    yText: number;
};

export const Section: React.FC<SectionProps> = ({ value, x1Line, y1Line, y2Line, xText, yText }) => {
    return (
        <g>
            <CalendarTick x1={x1Line + 0.5} y1={y1Line} x2={x1Line + 0.5} y2={y2Line} key={`${value}line`} />
            <CalendarText key={`${value}text`} y={yText} x={xText}>
                {value}
            </CalendarText>
        </g>
    );
};
