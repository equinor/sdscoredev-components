import React from 'react';
import styled from 'styled-components';
import { ItemWrapperProps } from '../../internal/ItemWrapper';

export const ProjectWrapper = styled.g`
    cursor: pointer;
    outline: none;
`;

export const ProjectBackground = styled.rect`
    user-select: none;
    opacity: 0.6;
`;

export const ProjectTop = styled.rect`
    user-select: none;
`;

export const ProjectBar: React.FC<ItemWrapperProps> = ({ task, isSelected }) => {
    const barColor = isSelected ? '#f7bb53' : '#fac465';
    const processColor = isSelected ? '#59a985' : '#7db59a';
    const projectWith = task.x2 - task.x1;

    const projectLeftTriangle = [
        task.x1,
        task.y + task.height / 2 - 1,
        task.x1,
        task.y + task.height,
        task.x1 + 15,
        task.y + task.height / 2 - 1,
    ].join(',');
    const projectRightTriangle = [
        task.x2,
        task.y + task.height / 2 - 1,
        task.x2,
        task.y + task.height,
        task.x2 - 15,
        task.y + task.height / 2 - 1,
    ].join(',');

    return (
        <ProjectWrapper tabIndex={0}>
            <ProjectBackground
                fill={barColor}
                x={task.x1}
                width={projectWith}
                y={task.y}
                height={task.height}
                rx={2}
                ry={2}
            />
            <rect
                x={task.progressX}
                width={task.progressWidth}
                y={task.y}
                height={task.height}
                ry={2}
                rx={2}
                fill={processColor}
            />
            <rect
                fill={barColor}
                x={task.x1}
                width={projectWith}
                y={task.y}
                height={task.height / 2}
                rx={2}
                ry={2}
                style={{ userSelect: 'none' }}
            />
            <polygon style={{ userSelect: 'none' }} points={projectLeftTriangle} fill={barColor} />
            <polygon style={{ userSelect: 'none' }} points={projectRightTriangle} fill={barColor} />
        </ProjectWrapper>
    );
};
