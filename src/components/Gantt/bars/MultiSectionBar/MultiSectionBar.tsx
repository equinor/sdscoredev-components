import React from 'react';
import { dateToProgress } from '../../helpers/bar-helper';
import styled from 'styled-components';
import { ResizeHandle } from '../../internal/ResizeHandle';
import { MultiSectionDisplay } from './MultiSectionDisplay';
import { Bar } from '../types';
import { MultiSectionTaskBar } from '.';

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

export const MultiSectionBar: React.FC<Bar<MultiSectionTaskBar>> = (props) => {
    const { taskBar, isDateChangeable = true, onEventStart, isSelected, sections } = props;

    return (
        <Wrapper>
            <MultiSectionDisplay
                x={taskBar.x1}
                y={taskBar.y}
                width={taskBar.x2 - taskBar.x1}
                height={taskBar.height}
                sectionXPositions={taskBar.sectionXPositions}
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
