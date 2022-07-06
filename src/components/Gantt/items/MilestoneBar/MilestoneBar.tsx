import React from 'react';
import styled from 'styled-components';
import { ItemWrapperProps } from '../../internal/ItemWrapper';

export const MilestoneWrapper = styled.g`
    cursor: pointer;
    outline: none;
`;

export const MilestoneBar: React.FC<ItemWrapperProps> = ({ task, isDateChangeable, onEventStart, isSelected }) => {
    const transform = `rotate(45 ${task.x1 + task.height * 0.356} 
    ${task.y + task.height * 0.85})`;
    const getBarColor = () => {
        return isSelected ? '#f29e4c' : '#f1c453';
    };

    return (
        <MilestoneWrapper tabIndex={0}>
            <rect
                fill={getBarColor()}
                x={task.x1}
                width={task.height}
                y={task.y}
                height={task.height}
                rx={2}
                ry={2}
                transform={transform}
                style={{ userSelect: 'none' }}
                onMouseDown={(e) => {
                    isDateChangeable && onEventStart('move', task, e);
                }}
            />
        </MilestoneWrapper>
    );
};
