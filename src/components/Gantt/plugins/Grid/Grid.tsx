import { BarTask } from 'components/Gantt/types/bar-task';
import { Task } from 'components/Gantt/types/public-types';
import React, { ReactChild, useContext } from 'react';
import styled from 'styled-components';
import { GridProps } from '.';
import { StateContext } from '../../GanttStore';
import { addToDate } from '../../helpers/date-helper';

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
    stroke: #ebeff2;
`;

export type InternalGridProps = {
    tasks: Task[];
    /**
     * Width of the generated svg
     */
    svgWidth: number;
    /**
     * Row height
     */
    rowHeight: number;
} & GridProps;

export const Grid: React.FC<InternalGridProps> = (props: InternalGridProps) => {
    const { tasks, svgWidth, rowHeight, columnWidth, todayColor } = props;

    const state: any = useContext(StateContext);

    let y = 0;
    const gridRows: ReactChild[] = [];
    const rowLines: ReactChild[] = [<GridRowLine key="RowLineFirst" x="0" y1={0} x2={svgWidth} y2={0} />];
    for (const task of tasks) {
        gridRows.push(<GridRow key={'Row' + task.id} x="0" y={y} width={svgWidth} height={rowHeight} />);
        rowLines.push(
            <GridRowLine key={'RowLine' + task.id} x="0" y1={y + rowHeight} x2={svgWidth} y2={y + rowHeight} />,
        );
        y += rowHeight;
    }

    const now = new Date();
    let tickX = 0;
    const ticks: ReactChild[] = [];
    let today: ReactChild = <rect />;
    for (let i = 0; i < state.ganttReducer.dates.length; i++) {
        const date = state.ganttReducer.dates[i];
        ticks.push(<GridTick key={date.getTime()} x1={tickX} y1={0} x2={tickX} y2={y} />);
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
            today = <rect x={tickX} y={0} width={columnWidth} height={y} fill={todayColor} />;
        }

        tickX += columnWidth;
    }
    return (
        <g className="grid">
            <g className="rows">{gridRows}</g>
            <g className="rowLines">{rowLines}</g>
            <g className="ticks">{ticks}</g>
            <g className="today">{today}</g>
        </g>
    );
};
