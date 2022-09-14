import React from 'react';
import styled from 'styled-components';
import { getProgressPoint } from '../../helpers/bar-helper';
import { BarDateHandle } from '../DateHandle';
import { ProgressDisplay } from './ProgressDisplay';
import { BarProgressHandle } from '../ProgressHandle';
import { Bar } from '../types';
import { ProgressTaskBar } from '.';

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

export type ProgressBarProps = {
    /**
     * Value in percent
     */
    progress?: number;
};

export const ProgressBar: React.FC<Bar<ProgressTaskBar>> = (props) => {
    const { taskBar, isProgressChangeable, isDateChangeable, onEventStart, isSelected, readonly } = props;
    const progressPoint = getProgressPoint(taskBar.progressWidth + taskBar.progressX, taskBar.y, taskBar.height);
    const handleHeight = taskBar.height - 2;

    return (
        <BarWrapper tabIndex={0}>
            <ProgressDisplay
                x={taskBar.x1}
                y={taskBar.y}
                width={taskBar.x2 - taskBar.x1}
                height={taskBar.height}
                progressX={taskBar.progressX}
                progressWidth={taskBar.progressWidth}
                isSelected={isSelected}
                onMouseDown={(e) => {
                    // eslint-disable-next-line no-unused-expressions
                    isDateChangeable && !readonly && onEventStart('move', taskBar, e);
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
                {isProgressChangeable && (
                    <BarProgressHandle
                        progressPoint={progressPoint}
                        onMouseDown={(e) => {
                            onEventStart('progress', taskBar, e);
                        }}
                    />
                )}
            </g>
        </BarWrapper>
    );
};
