import React, { useRef, useEffect, useContext } from 'react';
import { TaskGanttContentProps, TaskGanttContent } from './TaskGanttContent';
import { StateContext } from 'components/Gantt/GanttStore';
import styled from 'styled-components';
import { Grid } from '../plugins/Grid/Grid';
import { TaskBar } from '../bars/types';
import { Calendar, CalendarProps } from '../plugins/Calendar/Calendar';

export const VerticalContainer = styled.div`
    overflow-x: scroll;
    font-size: 0;
    margin: 0;
    padding: 0;
    display: grid;
`;

export const HorizontalContainer = styled.div`
    margin: 0;
    padding: 0;
    overflow: hidden;
`;

export type TaskGanttProps = {
    bars: TaskBar[];
    calendarProps: CalendarProps;
    barProps: TaskGanttContentProps;
    ganttHeight: number;
    scrollY: number;
    scrollX: number;
};
export const Container: React.FC<TaskGanttProps> = ({
    bars,
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
        <VerticalContainer ref={verticalGanttContainerRef}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={state.gridReducer.svgWidth}
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
                style={
                    ganttHeight
                        ? { height: ganttHeight, width: state.gridReducer.svgWidth }
                        : { width: state.gridReducer.svgWidth }
                }
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={state.gridReducer.svgWidth}
                    height={barProps.rowHeight * bars.length}
                    ref={ganttSVGRef}
                    style={{
                        fontFamily: 'Equinor',
                        fontSize: '12px',
                    }}
                >
                    <Grid {...state.gridReducer} bars={bars} />
                    <TaskGanttContent {...newBarProps} />
                </svg>
            </HorizontalContainer>
        </VerticalContainer>
    );
};
