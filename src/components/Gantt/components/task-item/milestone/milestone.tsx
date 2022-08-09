import React from 'react';
import { TaskItemProps } from '../task-item';
import { MilestoneWrapper } from './milestone.style';

export const Milestone: React.FC<TaskItemProps> = ({ task, isDateChangeable, onEventStart, isSelected }) => {
    const transform = `rotate(45 ${task.x1 + task.height * 0.356} 
    ${task.y + task.height * 0.85})`;
    const getBarColor = () => {
        return isSelected ? task.styles.backgroundSelectedColor : task.styles.backgroundColor;
    };

    return (
        <MilestoneWrapper tabIndex={0}>
            <rect
                fill={getBarColor()}
                x={task.x1}
                width={task.height}
                y={task.y}
                height={task.height}
                rx={task.barCornerRadius}
                ry={task.barCornerRadius}
                transform={transform}
                style={{ userSelect: 'none' }}
                onMouseDown={(e) => {
                    isDateChangeable && onEventStart('move', task, e);
                }}
            />
        </MilestoneWrapper>
    );
};
