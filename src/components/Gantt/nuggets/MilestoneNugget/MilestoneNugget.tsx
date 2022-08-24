import React from 'react';
import styled from 'styled-components';
import { Bar } from '../../bars/types';

export const MilestoneWrapper = styled.g`
    cursor: pointer;
    outline: none;
`;

export type MilestoneNuggetProps = {};

export const MilestoneNugget: React.FC<Bar<MilestoneNuggetProps>> = (props) => {
    const { taskBar } = props;

    const transform = `rotate(45 ${taskBar.x1 + taskBar.height * 0.356} 
    ${taskBar.y + taskBar.height * 0.85})`;

    return (
        <MilestoneWrapper tabIndex={0}>
            <rect
                fill="#9d9d9d"
                x={taskBar.x1}
                width={taskBar.height}
                y={taskBar.y}
                height={taskBar.height}
                rx={2}
                ry={2}
                transform={transform}
                style={{ userSelect: 'none', strokeWidth: 1, stroke: '#3e3e3e' }}
            />
        </MilestoneWrapper>
    );
};
