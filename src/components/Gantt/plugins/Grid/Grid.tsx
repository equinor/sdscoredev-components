import { TaskBar } from 'components/Gantt/bars/types';
import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { GridProps } from '.';
import { StateContext } from '../../GanttStore';

export const GridRowLine = styled.line`
    stroke: #ebeff2;
`;

export const GridRow = styled.rect`
    fill: #fff;

    /* Uncomment for stripes */
    /* &:nth-child(even) {
        fill: #f5f5f5;
    } */
`;

export const GridTick = styled.line`
    stroke: #ebeff2;
`;

export type InternalGridProps = {
    bars: TaskBar[];
    /**
     * Row height
     */
    rowHeight: number;
} & GridProps;

export const Grid: React.FC<InternalGridProps> = (props: InternalGridProps) => {
    const { bars, rowHeight, columnWidth, todayColor } = props;

    const state: any = useContext(StateContext);
    const canvas = useRef<HTMLCanvasElement>(null);

    const drawTicks = (ctx: CanvasRenderingContext2D, w: number, h: number): void => {
        let x = 0;
        for (let i = 0; i < state.ganttReducer.dates.length; i++) {
            ctx.beginPath();
            ctx.moveTo(x + 0.5, 0);
            ctx.lineTo(x + 0.5, h);
            ctx.strokeStyle = 'rgb(235, 239, 242)';
            ctx.lineWidth = 1;
            ctx.stroke();
            x = x + columnWidth;
        }
    };

    const drawRowLines = (ctx: CanvasRenderingContext2D, w: number, h: number): void => {
        let y = 0;
        for (let i = 0; i < bars.length; i++) {
            ctx.beginPath();
            ctx.moveTo(0, y + 0.5);
            ctx.lineTo(w, y + 0.5);
            ctx.strokeStyle = 'rgb(235, 239, 242)';
            ctx.lineWidth = 1;
            ctx.stroke();
            y = y + rowHeight;
        }
    };

    useEffect(() => {
        if (canvas.current?.getContext) {
            const width =
                state.ganttReducer.dates.length *
                state.ganttReducer.viewModeTickWidth[state.ganttReducer.viewMode.toLowerCase()]; // TODO: Remove hardcoded

            if (width > 65200) {
                console.warn('Canvas width is limited to 65200. Your canvas width is: ' + width);
                canvas.current.width = 65200;
            } else {
                canvas.current.width = width;
            }

            const ctx = canvas.current.getContext('2d');

            if (ctx) {
                const w = canvas.current.width;
                const h = bars.length * rowHeight;

                ctx.rect(0, 0, w, h);
                ctx.fillStyle = '#ffffff';
                ctx.fill();

                drawTicks(ctx, w, h);
                drawRowLines(ctx, w, h);
            }
        }
    }, [canvas.current, state.ganttReducer.dates.length]);

    // useEffect(() => {
    // }, [state.ganttReducer.dates.length]);

    // if (
    //     (i + 1 !== state.ganttReducer.dates.length &&
    //         date.getTime() < now.getTime() &&
    //         state.ganttReducer.dates[i + 1].getTime() >= now.getTime()) ||
    //     // if current date is last
    //     (i !== 0 &&
    //         i + 1 === state.ganttReducer.dates.length &&
    //         date.getTime() < now.getTime() &&
    //         addToDate(date, date.getTime() - state.ganttReducer.dates[i - 1].getTime(), 'millisecond').getTime() >=
    //             now.getTime())
    // ) {
    //     today = <rect x={tickX} y={0} width={columnWidth} height={y} fill={todayColor} />;
    //     // dispatch({ type: 'SET_SCROLL_X', payload: tickX - columnWidth });
    // }

    return (
        <canvas
            className="grid"
            ref={canvas}
            id="DemoCanvas"
            height={bars.length * rowHeight}
            style={{ borderBottom: '1px solid rgb(235, 239, 242)' }}
        ></canvas>
    );
};
