import React, { useRef, useEffect, useContext } from 'react';
import { TaskGanttContentProps, TaskGanttContent } from './TaskGanttContent';
import { DispatchContext, StateContext } from 'components/Gantt/GanttStore';
import styled from 'styled-components';
import { Grid } from '../plugins/Grid/Grid';
import { TaskBar } from '../bars/types';
import { Calendar, CalendarProps } from '../plugins/Calendar/Calendar';
import { isToday } from '../helpers/date-helper';
import { ViewMode } from '../types/public-types';

export const VerticalContainer = styled.div`
    overflow-x: scroll;
    font-size: 0;
    margin: 0;
    padding: 0;
    display: grid;
`;

export const HorizontalContainer = styled.div<{ height: number; width: number }>`
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: ${(props: any) => (props.height ? `${props.height}px` : 'unset')};
    width: ${(props: any) => (props.width ? `${props.width}px` : 'unset')};
    position: relative;
`;

export type TaskGanttProps = {
    bars: TaskBar[];
    nuggets: TaskBar[];
    calendarProps: CalendarProps;
    barProps: TaskGanttContentProps;
    ganttHeight: number;
    viewMode: ViewMode;
    grid: any;
};
export const Container: React.FC<TaskGanttProps> = ({
    bars,
    nuggets,
    calendarProps,
    barProps,
    ganttHeight,
    viewMode,
    grid,
}) => {
    const horizontalContainerRef = useRef<HTMLDivElement>(null);
    const verticalGanttContainerRef = useRef<HTMLDivElement>(null);

    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);
    const init = useRef(0);

    /**
     * Set SVG width when dates or columnWidth updates
     */
    useEffect(() => {
        const columnWidth = state.ganttReducer.viewModeTickWidth[viewMode.toLowerCase()];
        dispatch({
            type: 'SET_MEASURES',
            payload: { svgWidth: state.ganttReducer.dates.length * columnWidth, columnWidth },
        });

        if (init.current < 5 && state.ganttReducer.dates && verticalGanttContainerRef.current) {
            for (let i = 0; i < state.ganttReducer.dates.length; i++) {
                if (isToday(state.ganttReducer.dates[i])) {
                    init.current++;
                    dispatch({
                        type: 'SET_SCROLL_X',
                        payload: (i - 1) * columnWidth,
                    });
                    verticalGanttContainerRef.current.scrollTo((i - 1) * columnWidth, 0);
                }
            }
        }
    }, [state.ganttReducer.dates, viewMode]);

    useEffect(() => {
        if (horizontalContainerRef.current) {
            horizontalContainerRef.current.scrollTop = state.gridReducer.scrollY;
        }
    }, [state.gridReducer.scrollY]);

    useEffect(() => {
        if (verticalGanttContainerRef.current) {
            verticalGanttContainerRef.current.scrollLeft = state.gridReducer.scrollX;
        }
    }, [state.gridReducer.scrollX]);

    // if (verticalGanttContainerRef.current) {

    //     verticalGanttContainerRef.current.scrollTo(state.gridReducer.scrollX, 0);
    // }

    return (
        <VerticalContainer id="gantt-vertical-container" ref={verticalGanttContainerRef}>
            <svg
                id="gantt-calendar"
                xmlns="http://www.w3.org/2000/svg"
                width={state.gridReducer.svgWidth}
                height={state.ganttReducer.headerHeight}
                style={{
                    fontFamily: 'Equinor',
                    fontSize: '12px',
                }}
            >
                <Calendar {...calendarProps} viewMode={viewMode} />
            </svg>
            <HorizontalContainer
                id="gantt-horizontal-container"
                ref={horizontalContainerRef}
                height={ganttHeight}
                width={state.gridReducer.svgWidth}
            >
                <Grid {...state.gridReducer} bars={bars} nuggets={nuggets} viewMode={viewMode} {...grid.props} />
                <TaskGanttContent {...barProps} />
            </HorizontalContainer>
        </VerticalContainer>
    );
};
