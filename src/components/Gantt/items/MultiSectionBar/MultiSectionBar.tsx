import React from 'react';
import { dateToProgress, getProgressPoint } from '../../helpers/bar-helper';
import { ItemWrapperProps } from '../../internal/ItemWrapper';
import styled from 'styled-components';
import { ResizeHandle } from '../../internal/ResizeHandle';
import { MultiSectionDisplay } from './MultiSectionDisplay';
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

export const MultiSectionBar: React.FC<ItemWrapperProps> = (props) => {
    const { task, isProgressChangeable = true, isDateChangeable = true, onEventStart, isSelected } = props;
    const progressPoint = getProgressPoint(task.progressWidth + task.progressX, task.y, task.height);
    console.log(task);
    return (
        <BarWrapper tabIndex={0}>
            <MultiSectionDisplay
                x={task.x1}
                y={task.y}
                width={task.x2 - task.x1}
                height={task.height}
                progress={task.dates.map((d: Date) => dateToProgress(d, [task.start, task.end]))}
                isSelected={isSelected}
                onMouseDown={(e: any) => {
                    isDateChangeable && onEventStart('move', task, e);
                }}
            />
            <g className="handleGroup">
                {isDateChangeable && <ResizeHandle task={task} onEventStart={onEventStart} />}
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
