import React, { useRef, useEffect } from 'react';
import { GridProps, Grid } from '../grid/grid';
import { CalendarProps, Calendar } from '../calendar/calendar';
import { TaskGanttContentProps, TaskGanttContent } from './task-gantt-content';
import { GanttVerticalContainer, HorizontalContainer } from './gantt.style';

export type TaskGanttProps = {
    gridProps: GridProps;
    calendarProps: CalendarProps;
    barProps: TaskGanttContentProps;
    ganttHeight: number;
    scrollY: number;
    scrollX: number;
};
export const TaskGantt: React.FC<TaskGanttProps> = ({
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
        <GanttVerticalContainer ref={verticalGanttContainerRef} dir="ltr">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={gridProps.svgWidth}
                height={calendarProps.headerHeight}
                fontFamily={barProps.fontFamily}
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
                    height={barProps.rowHeight * barProps.tasks.length}
                    fontFamily={barProps.fontFamily}
                    ref={ganttSVGRef}
                >
                    <Grid {...gridProps} />
                    <TaskGanttContent {...newBarProps} />
                </svg>
            </HorizontalContainer>
        </GanttVerticalContainer>
    );
};
