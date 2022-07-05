import { Bar, BarSmall, Milestone, Project } from 'components/Gantt/items';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BarTask } from '../types/bar-task';
import { GanttContentMoveAction } from '../types/gantt-task-actions';

export const BarLabelInside = styled.text`
    fill: #fff;
    text-anchor: middle;
    font-weight: lighter;
    dominant-baseline: central;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: none;
`;

export const BarLabelOutside = styled.text`
    fill: #555;
    text-anchor: start;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: none;
`;

export type ItemWrapperProps = {
    task: BarTask;
    arrowIndent: number;
    taskHeight: number;
    isProgressChangeable: boolean;
    isDateChangeable: boolean;
    isDelete: boolean;
    isSelected: boolean;
    onEventStart: (
        action: GanttContentMoveAction,
        selectedTask: BarTask,
        event?: React.MouseEvent | React.KeyboardEvent,
    ) => any;
};

export const ItemWrapper: React.FC<ItemWrapperProps> = (props) => {
    const { task, arrowIndent, isDelete, taskHeight, isSelected, onEventStart } = {
        ...props,
    };
    const textRef = useRef<SVGTextElement>(null);
    const [taskItem, setTaskItem] = useState<JSX.Element>(<div />);
    const [isTextInside, setIsTextInside] = useState(true);

    useEffect(() => {
        switch (task.typeInternal) {
            case 'milestone':
                setTaskItem(<Milestone {...props} />);
                break;
            case 'project':
                setTaskItem(<Project {...props} />);
                break;
            case 'smalltask':
                setTaskItem(<BarSmall {...props} />);
                break;
            default:
                setTaskItem(<Bar {...props} />);
                break;
        }
    }, [task, isSelected]);

    useEffect(() => {
        if (textRef.current) {
            setIsTextInside(textRef.current.getBBox().width < task.x2 - task.x1);
        }
    }, [textRef, task]);

    const getX = () => {
        const width = task.x2 - task.x1;
        const hasChild = task.barChildren.length > 0;
        if (isTextInside) {
            return task.x1 + width * 0.5;
        }

        return task.x1 + width + arrowIndent * +hasChild + arrowIndent * 0.2;
    };

    return (
        <g
            onKeyDown={(e) => {
                switch (e.key) {
                    case 'Delete': {
                        if (isDelete) onEventStart('delete', task, e);
                        break;
                    }
                }
                e.stopPropagation();
            }}
            onMouseEnter={(e) => {
                onEventStart('mouseenter', task, e);
            }}
            onMouseLeave={(e) => {
                onEventStart('mouseleave', task, e);
            }}
            onDoubleClick={(e) => {
                onEventStart('dblclick', task, e);
            }}
            onClick={(e) => {
                onEventStart('click', task, e);
            }}
            onFocus={() => {
                onEventStart('select', task);
            }}
        >
            {taskItem}
            {isTextInside ? (
                <BarLabelInside x={getX()} y={task.y + taskHeight * 0.5} ref={textRef}>
                    {task.name}
                </BarLabelInside>
            ) : (
                <BarLabelOutside x={getX()} y={task.y + taskHeight * 0.5} ref={textRef}>
                    {task.name}
                </BarLabelOutside>
            )}
        </g>
    );
};
