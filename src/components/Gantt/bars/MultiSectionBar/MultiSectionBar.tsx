import React from 'react';
import { dateToProgress } from '../../helpers/bar-helper';
import styled from 'styled-components';
import { ResizeHandle } from '../../internal/ResizeHandle';
import { MultiSectionDisplay } from './MultiSectionDisplay';
import { Bar } from '../types';

const Wrapper = styled.g`
    cursor: pointer;
    outline: none;

    &:hover .barHandle {
        visibility: visible;
        opacity: 1;
    }
`;

export type MultiSectionBarProps = {
    /**
     * Array of dates that will split the bar in sections
     */
    sections?: Date[];
};

export const MultiSectionBar: React.FC<Bar<MultiSectionBarProps>> = (props) => {
    const { taskBar, isDateChangeable = true, onEventStart, isSelected, sections } = props;

    return (
        <Wrapper>
            <MultiSectionDisplay
                x={taskBar.x1}
                y={taskBar.y}
                width={taskBar.x2 - taskBar.x1}
                height={taskBar.height}
                sectionXPositions={sections?.map((d: Date) => dateToProgress(d, [taskBar.start, taskBar.end])) || []}
                isSelected={isSelected}
                onMouseDown={(e: any) => {
                    isDateChangeable && onEventStart('move', taskBar, e);
                }}
            />
            <g className="handleGroup">
                {isDateChangeable && <ResizeHandle task={taskBar} onEventStart={onEventStart} />}
            </g>
        </Wrapper>
    );
};
