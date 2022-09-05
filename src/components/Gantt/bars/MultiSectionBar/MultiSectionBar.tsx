import React from 'react';
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
    dates?: Date[];
    theme?: any;
    /**
     * Array of mapped dates to x-position
     */
    sectionXPositions?: number[];
};

export const MultiSectionBar: React.FC<Bar<MultiSectionTaskBar>> = (props) => {
    const { taskBar, isDateChangeable = true, onEventStart, isSelected, sections, theme } = props;

    return (
        <Wrapper>
            <MultiSectionDisplay
                x={taskBar.x1}
                y={taskBar.y}
                width={taskBar.x2 - taskBar.x1}
                height={taskBar.height}
                sectionXPositions={taskBar.type[1].sectionXPositions}
                isSelected={isSelected}
                theme={theme}
                onMouseDown={(e: any) => {
                    // eslint-disable-next-line no-unused-expressions
                    isDateChangeable && onEventStart('move', taskBar, e);
                }}
            />
            <g className="handleGroup">
                {isDateChangeable && <ResizeHandle task={taskBar} onEventStart={onEventStart} />}
            </g>
        </Wrapper>
    );
};
