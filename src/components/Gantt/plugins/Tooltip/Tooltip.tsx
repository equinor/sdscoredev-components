import { Popover, Typography } from '@equinor/eds-core-react';
import React, { useRef, useEffect } from 'react';
import { TaskBar } from '../../bars/types';
import { TooltipProps } from '.';

export type InternalTooltipProps = {
    task: TaskBar;
    anchorRef: any;
    containerRef?: React.RefObject<HTMLDivElement>;
    taskListRef?: React.RefObject<HTMLDivElement>;
} & TooltipProps;

export const Tooltip: React.FC<InternalTooltipProps> = (props) => {
    const { task, anchorRef, containerRef, taskListRef, render } = props;
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const calendarHeight = 48; // TODO: Remove hardcoded
    let y = 0;
    let x = 0;

    /**
     * When the task is updated, either by hovering the bar, dragging or resizing, this effect will run.
     * The task in the dependency contains a TaskBar with positional data as well as the task props.
     */
    useEffect(() => {
        const handleMouseMove = (evt: MouseEvent) => {
            if (taskListRef?.current && containerRef?.current && tooltipRef.current) {
                const taskListWidth = taskListRef?.current?.offsetWidth;
                const rect = containerRef.current.getBoundingClientRect();
                x = taskListWidth + evt.clientX - rect.left - tooltipRef.current.offsetWidth / 2;

                /** Set new tooltip position based on mouse and bar position */
                tooltipRef.current.style.top = 'unset';
                tooltipRef.current.style.left = 'unset';
                tooltipRef.current.style.transform = `translate(${x}px, ${y}px)`;
            }
        };

        /** Calculate y position and also add listener for mouse move event */
        if (tooltipRef.current && containerRef?.current && taskListRef?.current && task) {
            y = -(calendarHeight - task.y) + 28;

            /** Set new tooltip position based on mouse and bar position */
            tooltipRef.current.style.top = 'unset';
            tooltipRef.current.style.left = 'unset';
            tooltipRef.current.style.transform = `translate(${x}px, ${y}px)`;

            containerRef.current.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            containerRef?.current?.removeEventListener('mousemove', handleMouseMove);
        };
    }, [task, containerRef, tooltipRef, taskListRef]);

    return (
        <Popover
            ref={tooltipRef}
            id="hover-popover"
            anchorEl={anchorRef.current}
            // onClose={handleClose}
            open={!!task}
            placement="top"
        >
            <Popover.Content>
                {!render && task && <Typography variant="body_short">{task.id} 123</Typography>}

                {render && task && render(task)}
            </Popover.Content>
        </Popover>
    );
};
