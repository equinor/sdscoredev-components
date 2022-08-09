import React, { useState } from 'react';
import { getProgressPoint } from '../../../helpers/bar-helper';
import { ActionBarDisplay } from './actionBar-display';
import { ActionBarDateHandle } from './actionBar-date-handle';
import { ActionBarProgressHandle } from './actionBar-progress-handle';
import { TaskItemProps } from '../task-item';
import { ActionBarWrapper } from './actionBar.style';

export const ActionBar: React.FC<TaskItemProps> = ({
    task,
    isProgressChangeable,
    isDateChangeable,
    onEventStart,
    isSelected,
}) => {
    const [hidden, setHidden] = useState<boolean>(true);
    const progressPoint = getProgressPoint(task.progressWidth + task.progressX, task.y, task.height);
    const handleHeight = task.height - 2;

    console.log(111);
    return (
        <ActionBarWrapper
            tabIndex={0}
            onMouseEnter={() => {
                setHidden(false);
            }}
            onMouseLeave={() => {
                setHidden(true);
            }}
        >
            <ActionBarDisplay
                x={task.x1}
                y={task.y}
                width={task.x2 - task.x1}
                height={task.height}
                progressX={task.progressX}
                progressWidth={task.progressWidth}
                dates={task.dates}
                actionBarCornerRadius={task.barCornerRadius}
                styles={task.styles}
                isSelected={isSelected}
                onMouseDown={(e: any) => {
                    isDateChangeable && onEventStart('move', task, e);
                }}
            />
            <g className="handleGroup">
                {isDateChangeable && (
                    <g>
                        {/* left */}
                        <ActionBarDateHandle
                            x={task.x1 + 1}
                            y={task.y + 1}
                            width={task.handleWidth}
                            height={handleHeight}
                            hidden={hidden}
                            actionBarCornerRadius={task.barCornerRadius}
                            onMouseDown={(e) => {
                                onEventStart('start', task, e);
                            }}
                        />
                        {/* right */}
                        <ActionBarDateHandle
                            x={task.x2 - task.handleWidth - 1}
                            y={task.y + 1}
                            width={task.handleWidth}
                            height={handleHeight}
                            hidden={hidden}
                            actionBarCornerRadius={task.barCornerRadius}
                            onMouseDown={(e) => {
                                onEventStart('end', task, e);
                            }}
                        />
                    </g>
                )}
                {isProgressChangeable && (
                    <ActionBarProgressHandle
                        progressPoint={progressPoint}
                        onMouseDown={(e) => {
                            onEventStart('progress', task, e);
                        }}
                        hidden={hidden}
                    />
                )}
            </g>
        </ActionBarWrapper>
    );
};
