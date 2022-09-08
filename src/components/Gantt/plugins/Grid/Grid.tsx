import { TaskBar } from 'components/Gantt/bars/types';
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';
import { ViewMode } from 'types';
import { GridProps, GridRef } from '.';
import { DispatchContext, StateContext } from '../../GanttStore';

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
    /**
     * Count of visible bars
     */
    barCount: number;
    viewMode: ViewMode;
    /**
     * Row height
     */
    rowHeight: number;
    setFocus: Function;
} & GridProps;

export const Grid = forwardRef<GridRef, InternalGridProps>((props: InternalGridProps, ref) => {
    const { barCount, setFocus, viewMode, rowHeight, todayColor } = props;

    const state: any = useContext(StateContext);
    const canvas = useRef<HTMLCanvasElement>(null);
    const dispatch: any = useContext(DispatchContext);

    const renderGrid = () => {
        console.log('renderGrid');
    };

    useImperativeHandle(ref, () => ({
        handleResize: () => renderGrid(),
    }));

    const drawTicks = (ctx: CanvasRenderingContext2D, w: number, h: number, tickWidth: number): void => {
        let x = 0;
        for (let i = 0; i < state.ganttReducer.dates.length; i++) {
            ctx.beginPath();
            ctx.moveTo(x + 0.5, 0);
            ctx.lineTo(x + 0.5, h);
            ctx.strokeStyle = 'rgb(235, 239, 242)';
            ctx.lineWidth = 1;
            ctx.stroke();
            x += tickWidth;
        }
    };

    const drawRowLines = (ctx: CanvasRenderingContext2D, w: number, h: number): void => {
        let y = 0;
        for (let i = 0; i < barCount; i++) {
            ctx.beginPath();
            ctx.moveTo(0, y + 0.5);
            ctx.lineTo(w, y + 0.5);
            ctx.strokeStyle = 'rgb(235, 239, 242)';
            ctx.lineWidth = 1;
            ctx.stroke();
            y += rowHeight;
        }
    };

    // useEffect(() => {
    //     if (!focus || focus === state.gridReducer.focus.valueOf() || !Array.isArray(focus)) return;
    //     const index = getTickIndex(focus[0], state.ganttReducer.dates);

    //     dispatch({ type: 'SET_SCROLL_X', payload: state.gridReducer.tickWidth * index });
    //     dispatch({ type: 'SET_FOCUS', payload: focus });
    // }, [focus, state.gridReducer.tickWidth]);

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
    //     today = <rect x={tickX} y={0} width={tickWidth} height={y} fill={todayColor} />;
    //     // dispatch({ type: 'SET_SCROLL_X', payload: tickX - tickWidth });
    // }

    useEffect(() => {
        if (state.gridReducer.tickWidth && canvas.current?.getContext && viewMode && state.ganttReducer.dates.length) {
            const width = state.ganttReducer.dates.length * state.gridReducer.tickWidth;

            if (width > 65200) {
                // console.warn('Canvas width is limited to 65200. Your canvas width is: ' + width);
                canvas.current.width = 65200;
            } else {
                canvas.current.width = width;
            }

            const ctx = canvas.current.getContext('2d');

            if (ctx) {
                const w = canvas.current.width;
                const h = barCount * rowHeight;

                ctx.rect(0, 0, w, h);
                ctx.fillStyle = '#ffffff';
                ctx.fill();

                drawTicks(ctx, w, h, state.gridReducer.tickWidth);
                drawRowLines(ctx, w, h);
            }
        }
    }, [state.gridReducer.tickWidth, viewMode, state.ganttReducer.dates.length]);

    // if (canvas.current?.getContext && viewMode && state.ganttReducer.dates.length) {
    //     const width = state.ganttReducer.dates.length * state.ganttReducer.viewModeTickWidth[viewMode.toLowerCase()];

    //     if (width > 65200) {
    //         // console.warn('Canvas width is limited to 65200. Your canvas width is: ' + width);
    //         canvas.current.width = 65200;
    //     } else {
    //         canvas.current.width = width;
    //     }

    //     const ctx = canvas.current.getContext('2d');

    //     if (ctx) {
    //         const w = canvas.current.width;
    //         const h = barCount * rowHeight;

    //         ctx.rect(0, 0, w, h);
    //         ctx.fillStyle = '#ffffff';
    //         ctx.fill();

    //         drawTicks(ctx, w, h);
    //         drawRowLines(ctx, w, h);
    //     }
    // }

    return (
        <canvas
            className="grid"
            ref={canvas}
            id="DemoCanvas"
            height={barCount * rowHeight}
            style={{ borderBottom: '1px solid rgb(235, 239, 242)' }}
        />
    );
});
