import React from 'react';
import { TaskItemProps } from '../task-item';
import { ProjectBackground, ProjectWrapper } from './project.style';

export const Project: React.FC<TaskItemProps> = ({ task, isSelected }) => {
    const barColor = isSelected ? task.styles.backgroundSelectedColor : task.styles.backgroundColor;
    const processColor = isSelected ? task.styles.progressSelectedColor : task.styles.progressColor;
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
                rx={task.barCornerRadius}
                ry={task.barCornerRadius}
            />
            <rect
                x={task.progressX}
                width={task.progressWidth}
                y={task.y}
                height={task.height}
                ry={task.barCornerRadius}
                rx={task.barCornerRadius}
                fill={processColor}
            />
            <rect
                fill={barColor}
                x={task.x1}
                width={projectWith}
                y={task.y}
                height={task.height / 2}
                rx={task.barCornerRadius}
                ry={task.barCornerRadius}
                style={{ userSelect: 'none' }}
            />
            <polygon style={{ userSelect: 'none' }} points={projectLeftTriangle} fill={barColor} />
            <polygon style={{ userSelect: 'none' }} points={projectRightTriangle} fill={barColor} />
        </ProjectWrapper>
    );
};
