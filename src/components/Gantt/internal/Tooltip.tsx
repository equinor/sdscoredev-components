import { Task, TaskBar } from 'components/Gantt/bars/types';
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

export const TooltipDefaultContainer = styled.div`
    background: #fff;
    padding: 12px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export const TooltipDefaultContainerParagraph = styled.p`
    font-size: 12px;
    margin-bottom: 6px;
    color: #666;
`;

export const TooltipDetailsContainer = styled.div<{ hidden: boolean }>`
    position: absolute;
    display: flex;
    flex-shrink: 0;
    pointer-events: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    visibility: ${(props) => (props.hidden ? 'hidden' : 'visible')};
`;

export type TooltipProps = {
    task: TaskBar;
    arrowIndent: number;
    svgContainerHeight: number;
    svgContainerWidth: number;
    svgWidth: number;
    headerHeight: number;
    taskListWidth: number;
    scrollX: number;
    scrollY: number;
    rowHeight: number;
    TooltipContent: React.FC<{
        task: Task;
    }>;
};
export const Tooltip: React.FC<TooltipProps> = ({
    task,
    rowHeight,
    svgContainerHeight,
    svgContainerWidth,
    scrollX,
    scrollY,
    arrowIndent,
    headerHeight,
    taskListWidth,
    TooltipContent,
}) => {
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const [relatedY, setRelatedY] = useState(0);
    const [relatedX, setRelatedX] = useState(0);
    useEffect(() => {
        if (tooltipRef.current) {
            const tooltipHeight = tooltipRef.current.offsetHeight * 1.1;
            const tooltipWidth = tooltipRef.current.offsetWidth * 1.1;

            let newRelatedY = task.index * rowHeight - scrollY + headerHeight;
            let newRelatedX: number;

            newRelatedX = task.x2 + arrowIndent * 1.5 + taskListWidth - scrollX;
            const tooltipLeftmostPoint = tooltipWidth + newRelatedX;
            const fullChartWidth = taskListWidth + svgContainerWidth;
            if (tooltipLeftmostPoint > fullChartWidth) {
                newRelatedX = task.x1 + taskListWidth - arrowIndent * 1.5 - scrollX - tooltipWidth;
            }
            if (newRelatedX < taskListWidth) {
                newRelatedX = svgContainerWidth + taskListWidth - tooltipWidth;
                newRelatedY += rowHeight;
            }

            const tooltipLowerPoint = tooltipHeight + newRelatedY - scrollY;
            if (tooltipLowerPoint > svgContainerHeight - scrollY) {
                newRelatedY = svgContainerHeight - tooltipHeight;
            }
            setRelatedY(newRelatedY);
            setRelatedX(newRelatedX);
        }
    }, [
        tooltipRef,
        task,
        arrowIndent,
        scrollX,
        scrollY,
        headerHeight,
        taskListWidth,
        rowHeight,
        svgContainerHeight,
        svgContainerWidth,
    ]);

    return (
        <TooltipDetailsContainer ref={tooltipRef} hidden={!relatedX} style={{ left: relatedX, top: relatedY }}>
            <TooltipContent task={task} />
        </TooltipDetailsContainer>
    );
};

export const StandardTooltipContent: React.FC<{
    task: Task;
    fontSize: string;
    fontFamily: string;
}> = ({ task, fontSize, fontFamily }) => {
    const style = {
        fontSize,
        fontFamily,
    };
    return (
        <TooltipDefaultContainer style={style}>
            <b style={{ fontSize: fontSize + 6 }}>{`${task.name}: ${task.start.getDate()}-${
                task.start.getMonth() + 1
            }-${task.start.getFullYear()} - ${task.end.getDate()}-${
                task.end.getMonth() + 1
            }-${task.end.getFullYear()}`}</b>
            {task.end.getTime() - task.start.getTime() !== 0 && (
                <TooltipDefaultContainerParagraph>{`Duration: ${~~(
                    (task.end.getTime() - task.start.getTime()) /
                    (1000 * 60 * 60 * 24)
                )} day(s)`}</TooltipDefaultContainerParagraph>
            )}

            {/* <TooltipDefaultContainerParagraph>
                {!!task.progress && `Progress: ${task.progress} %`}
            </TooltipDefaultContainerParagraph> */}
        </TooltipDefaultContainer>
    );
};
