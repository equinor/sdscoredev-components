import React, { ReactChild, useContext } from 'react';
import styled from 'styled-components';
import { DispatchContext, StateContext } from '../GanttStore';
import { addToDate } from '../helpers/date-helper';
import { Task } from '../types/public-types';

export const GridRowLine = styled.line`
    stroke: #ebeff2;
`;

export const GridRow = styled.rect`
    fill: #fff;

    &:nth-child(even) {
        fill: #f5f5f5;
    }
`;

export const GridTick = styled.line`
    stroke: #444;
`;

export type GridProps = {
    // tasks: Task[];
    // dates: Date[];
    svgWidth?: number;
    rowHeight?: number;
    columnWidth?: number;
    todayColor?: string;
};
export const Grid: React.FC<GridProps> = (props) => {
    const { rowHeight = 50, svgWidth = 200, columnWidth = 200, todayColor = 'rgba(0, 0, 0, 0.05)' } = props;

    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);

    // let y = 0;
    // const gridRows: ReactChild[] = [];
    // const rowLines: ReactChild[] = [<GridRowLine key="RowLineFirst" x="0" y1={0} x2={svgWidth} y2={0} />];
    // for (const task of tasks) {
    //     gridRows.push(<GridRow key={'Row' + task.id} x="0" y={y} width={svgWidth} height={rowHeight} />);
    //     rowLines.push(
    //         <GridRowLine key={'RowLine' + task.id} x="0" y1={y + rowHeight} x2={svgWidth} y2={y + rowHeight} />,
    //     );
    //     y += rowHeight;
    // }

    const now = new Date();
    let tickX = 0;
    const ticks: ReactChild[] = [];
    let today: ReactChild = <rect />;
    for (let i = 0; i < state.ganttReducer.dates.length; i++) {
        const date = state.ganttReducer.dates[i];
        ticks.push(<GridTick key={date.getTime()} x1={tickX} y1={0} x2={tickX} y2={300} />);
        if (
            (i + 1 !== state.ganttReducer.dates.length &&
                date.getTime() < now.getTime() &&
                state.ganttReducer.dates[i + 1].getTime() >= now.getTime()) ||
            // if current date is last
            (i !== 0 &&
                i + 1 === state.ganttReducer.dates.length &&
                date.getTime() < now.getTime() &&
                addToDate(date, date.getTime() - state.ganttReducer.dates[i - 1].getTime(), 'millisecond').getTime() >=
                    now.getTime())
        ) {
            today = <rect x={tickX} y={0} width={columnWidth} height={300} fill={todayColor} />;
        }

        tickX += columnWidth;
    }

    console.log(ticks);
    return (
        <g className="gridBody">
            {/* <g className="rows">{gridRows}</g>
            <g className="rowLines">{rowLines}</g> */}
            <g className="ticks">{ticks}d</g>
            <g className="today">{today}f</g>
        </g>
    );
};
