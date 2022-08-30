import React from 'react';
import { BarDateHandle } from '../bars/DateHandle';
import { TaskBar } from '../bars/types';
import { GanttContentMoveAction } from '../types/gantt-task-actions';

export type ResizeHandleProps = {
    task: TaskBar;
    onEventStart: (
        action: GanttContentMoveAction,
        selectedTask: TaskBar,
        event?: React.MouseEvent | React.KeyboardEvent,
    ) => any;
};

export const ResizeHandle: React.FC<ResizeHandleProps> = (props) => {
    const { task, onEventStart } = props;
    const handleHeight = task.height - 8;
    const handleWidth = 5; // task.handleWidth

    return (
        <g>
            {/* Left handle */}
            <BarDateHandle
                x={task.x1 + 3}
                y={task.y + 4}
                width={handleWidth}
                height={handleHeight}
                onMouseDown={(e) => {
                    onEventStart('start', task, e);
                }}
            />
            {/* Right handle */}
            <BarDateHandle
                x={task.x2 - handleWidth - 2}
                y={task.y + 4}
                width={handleWidth}
                height={handleHeight}
                onMouseDown={(e) => {
                    onEventStart('end', task, e);
                }}
            />
        </g>
    );
};
