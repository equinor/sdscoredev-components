import React, { useRef, useEffect, useContext } from 'react';
import { GridProps, Grid } from '../components/grid/grid';
import { CalendarProps, Calendar } from '../components/calendar/calendar';
import { TaskGanttContentProps, TaskGanttContent } from '../components/gantt/task-gantt-content';
import { StateContext } from 'components/Gantt/GanttStore';
import styled from 'styled-components';

export const VerticalContainer = styled.div`
    overflow: hidden;
    font-size: 0;
    margin: 0;
    padding: 0;
`;

export const HorizontalContainer = styled.div`
    margin: 0;
    padding: 0;
    overflow: hidden;
`;

export type TaskGanttProps = {
    gridProps: GridProps;
    calendarProps: CalendarProps;
    barProps: TaskGanttContentProps;
    ganttHeight: number;
    scrollY: number;
    scrollX: number;
};
export const Container: React.FC<TaskGanttProps> = ({
    gridProps,
    calendarProps,
    barProps,
    ganttHeight,
    scrollY,
    scrollX,
}) => {
    const ganttSVGRef = useRef<SVGSVGElement>(null);
    const horizontalContainerRef = useRef<HTMLDivElement>(null);
    const verticalGanttContainerRef = useRef<HTMLDivElement>(null);
    const newBarProps = { ...barProps, svg: ganttSVGRef };
    const state: any = useContext(StateContext);

    useEffect(() => {
        if (horizontalContainerRef.current) {
            horizontalContainerRef.current.scrollTop = scrollY;
        }
    }, [scrollY]);

    useEffect(() => {
        if (verticalGanttContainerRef.current) {
            verticalGanttContainerRef.current.scrollLeft = scrollX;
        }
    }, [scrollX]);

    return (
        <VerticalContainer ref={verticalGanttContainerRef} dir="ltr">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={gridProps.svgWidth}
                height={calendarProps.headerHeight}
                style={{
                    fontFamily: 'Equinor',
                    fontSize: '12px',
                }}
            >
                <Calendar {...calendarProps} />
            </svg>
            <HorizontalContainer
                ref={horizontalContainerRef}
                style={ganttHeight ? { height: ganttHeight, width: gridProps.svgWidth } : { width: gridProps.svgWidth }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={gridProps.svgWidth}
                    height={barProps.rowHeight * state.ganttReducer.tasks.length}
                    ref={ganttSVGRef}
                    style={{
                        fontFamily: 'Equinor',
                        fontSize: '12px',
                    }}
                >
                    <Grid {...gridProps} />
                    <TaskGanttContent {...newBarProps} />
                </svg>
            </HorizontalContainer>
        </VerticalContainer>
    );
};
