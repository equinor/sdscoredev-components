import React from 'react';
import styled from 'styled-components';
import { Bar } from '../types';

export const MilestoneWrapper = styled.g`
    cursor: pointer;
    outline: none;
`;

export type MilestoneBarProps = {};

export const MilestoneBar: React.FC<Bar<MilestoneBarProps>> = (props) => {
    const { taskBar, isDateChangeable = true, onEventStart, isSelected } = props;

    const transform = `rotate(45 ${taskBar.x1 + taskBar.height * 0.356} 
    ${taskBar.y + taskBar.height * 0.85})`;
    const getBarColor = () => {
        return isSelected ? '#f29e4c' : '#f1c453';
    };

    return (
        <MilestoneWrapper tabIndex={0}>
            <rect
                fill={getBarColor()}
                x={taskBar.x1}
                width={taskBar.height}
                y={taskBar.y}
                height={taskBar.height}
                rx={2}
                ry={2}
                transform={transform}
                style={{ userSelect: 'none' }}
                onMouseDown={(e) => {
                    // eslint-disable-next-line no-unused-expressions
                    isDateChangeable && onEventStart('move', taskBar, e);
                }}
            />
        </MilestoneWrapper>
    );
};
