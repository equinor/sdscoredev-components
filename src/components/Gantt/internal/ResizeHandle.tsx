import React from 'react';
import { BarDateHandle } from '../items';
import { BarTask } from '../types/bar-task';
import { GanttContentMoveAction } from '../types/gantt-task-actions';

export type ResizeHandleProps = {
    task: BarTask;
    onEventStart: (
        action: GanttContentMoveAction,
        selectedTask: BarTask,
        event?: React.MouseEvent | React.KeyboardEvent,
    ) => any;
};

export const ResizeHandle: React.FC<ResizeHandleProps> = (props) => {
    const { task, onEventStart } = props;
    const handleHeight = task.height - 2;

    return (
        <g>
            {/* Left handle */}
            <BarDateHandle
                x={task.x1 + 1}
                y={task.y + 1}
                width={task.handleWidth}
                height={handleHeight}
                onMouseDown={(e) => {
                    onEventStart('start', task, e);
                }}
            />
            {/* Right handle */}
            <BarDateHandle
                x={task.x2 - task.handleWidth - 1}
                y={task.y + 1}
                width={task.handleWidth}
                height={handleHeight}
                onMouseDown={(e) => {
                    onEventStart('end', task, e);
                }}
            />
        </g>
    );
};
