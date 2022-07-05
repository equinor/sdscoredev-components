import React from 'react';
import styled from 'styled-components';
import { BarDisplay, BarProgressHandle } from '.';
import { ItemWrapperProps } from '../internal/ItemWrapper';
import { getProgressPoint } from '../helpers/bar-helper';

export const BarWrapper = styled.g`
    cursor: pointer;
    outline: none;

    &:hover .barHandle {
        visibility: visible;
        opacity: 1;
    }
`;

export const DateHandle = styled.rect`
    fill: #ddd;
    cursor: ew-resize;
    opacity: 0;
    visibility: hidden;
`;

export const ProgressHandle = styled.polygon`
    fill: #ddd;
    cursor: ew-resize;
    opacity: 0;
    visibility: hidden;
`;

export const BarSmall: React.FC<ItemWrapperProps> = ({
    task,
    isProgressChangeable,
    isDateChangeable,
    onEventStart,
    isSelected,
}) => {
    const progressPoint = getProgressPoint(task.progressWidth + task.x1, task.y, task.height);
    return (
        <BarWrapper tabIndex={0}>
            <BarDisplay
                x={task.x1}
                y={task.y}
                width={task.x2 - task.x1}
                height={task.height}
                progressX={task.progressX}
                progressWidth={task.progressWidth}
                isSelected={isSelected}
                onMouseDown={(e) => {
                    isDateChangeable && onEventStart('move', task, e);
                }}
            />
            <g className="handleGroup">
                {isProgressChangeable && (
                    <BarProgressHandle
                        progressPoint={progressPoint}
                        onMouseDown={(e) => {
                            onEventStart('progress', task, e);
                        }}
                    />
                )}
            </g>
        </BarWrapper>
    );
};
