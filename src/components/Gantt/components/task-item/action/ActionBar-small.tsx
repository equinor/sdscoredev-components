import React from 'react';
import { getProgressPoint } from '../../../helpers/bar-helper';
import { ActionBarDisplay } from './actionBar-display';
import { ActionBarProgressHandle } from './actionBar-progress-handle';
import { TaskItemProps } from '../task-item';
import { ActionBarWrapper } from './actionBar.style';

export const ActionBarSmall: React.FC<TaskItemProps> = ({
    task,
    isProgressChangeable,
    isDateChangeable,
    onEventStart,
    isSelected,
}) => {
    const progressPoint = getProgressPoint(task.progressWidth + task.x1, task.y, task.height);
    return (
        <ActionBarWrapper tabIndex={0}>
            <ActionBarDisplay
                x={task.x1}
                y={task.y}
                width={task.x2 - task.x1}
                height={task.height}
                progressX={task.progressX}
                progressWidth={task.progressWidth}
                actionBarCornerRadius={task.barCornerRadius}
                styles={task.styles}
                isSelected={isSelected}
                onMouseDown={(e) => {
                    isDateChangeable && onEventStart('move', task, e);
                }}
            />
            <g className="handleGroup">
                {isProgressChangeable && (
                    <ActionBarProgressHandle
                        progressPoint={progressPoint}
                        onMouseDown={(e) => {
                            onEventStart('progress', task, e);
                        }}
                    />
                )}
            </g>
        </ActionBarWrapper>
    );
};
