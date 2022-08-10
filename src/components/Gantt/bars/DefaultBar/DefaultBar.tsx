import React from 'react';
import { BarDateHandle } from '../DateHandle';
import styled from 'styled-components';
import { DefaultDisplay } from './DefaultDisplay';
import { Bar } from '../types';

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

export type DefaultBarProps = {};

export const DefaultBar: React.FC<Bar<DefaultBarProps>> = (props) => {
    const { taskBar, isDateChangeable = true, onEventStart, isSelected } = props;
    const handleHeight = taskBar.height - 2;

    return (
        <BarWrapper tabIndex={0}>
            <DefaultDisplay
                x={taskBar.x1}
                y={taskBar.y}
                width={taskBar.x2 - taskBar.x1}
                height={taskBar.height}
                isSelected={isSelected}
                onMouseDown={(e) => {
                    isDateChangeable && onEventStart('move', taskBar, e);
                }}
            />
            <g className="handleGroup">
                {isDateChangeable && (
                    <g>
                        {/* left */}
                        <BarDateHandle
                            x={taskBar.x1 + 1}
                            y={taskBar.y + 1}
                            width={taskBar.handleWidth}
                            height={handleHeight}
                            onMouseDown={(e) => {
                                onEventStart('start', taskBar, e);
                            }}
                        />
                        {/* right */}
                        <BarDateHandle
                            x={taskBar.x2 - taskBar.handleWidth - 1}
                            y={taskBar.y + 1}
                            width={taskBar.handleWidth}
                            height={handleHeight}
                            onMouseDown={(e) => {
                                onEventStart('end', taskBar, e);
                            }}
                        />
                    </g>
                )}
            </g>
        </BarWrapper>
    );
};
