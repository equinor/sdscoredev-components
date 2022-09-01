import { Popover, Typography } from '@equinor/eds-core-react';
import { TaskBar } from 'components/Gantt/bars/types';
import React, { useRef, useEffect } from 'react';
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
    const calendarHeight = 50; // TODO: Remove hardcoded
    let y = 0;
    let x = 0;

    useEffect(() => {
        const handleMouseMove = (evt: MouseEvent) => {
            if (taskListRef?.current && containerRef?.current && tooltipRef.current) {
                const taskListWidth = taskListRef?.current?.offsetWidth;
                const rect = containerRef.current.getBoundingClientRect();
                x = taskListWidth + evt.clientX - rect.left - tooltipRef.current.offsetWidth / 2;

                tooltipRef.current.style.transform = `translate(${x}px, ${y}px)`;
            }
        };

        if (tooltipRef.current && containerRef?.current && taskListRef?.current && task) {
            y = -(containerRef.current.offsetHeight - calendarHeight - task.y) - 10;

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
