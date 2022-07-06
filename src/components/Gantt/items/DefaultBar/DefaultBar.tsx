import React from 'react';
import { getProgressPoint } from '../../helpers/bar-helper';
import { BarDateHandle } from '../DateHandle';
import styled from 'styled-components';
import { ItemWrapperProps } from '../../internal/ItemWrapper';
import { BarDisplay } from './DefaultDisplay';
import { BarProgressHandle } from '../ProgressHandle';

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

export const DefaultBar: React.FC<ItemWrapperProps> = ({
    task,
    isProgressChangeable,
    isDateChangeable,
    onEventStart,
    isSelected,
}) => {
    const progressPoint = getProgressPoint(task.progressWidth + task.progressX, task.y, task.height);
    const handleHeight = task.height - 2;

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
                {isDateChangeable && (
                    <g>
                        {/* left */}
                        <BarDateHandle
                            x={task.x1 + 1}
                            y={task.y + 1}
                            width={task.handleWidth}
                            height={handleHeight}
                            onMouseDown={(e) => {
                                onEventStart('start', task, e);
                            }}
                        />
                        {/* right */}
                        <BarDateHandle
                            x={task.x2 - task.handleWidth - 1}
                            y={task.y + 1}
                            width={task.handleWidth}
                            height={handleHeight}
                            onMouseDown={(e) => {
                                onEventStart('end', task, e);
                            }}
                        />
                    </g>
                )}
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
