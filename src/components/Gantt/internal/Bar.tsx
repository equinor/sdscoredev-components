import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Bar } from '../bars/types';

export const BarLabelInside = styled.text`
    fill: #fff;
    text-anchor: middle;
    font-weight: lighter;
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

export const InternalBar: React.FC<Bar> = (props) => {
    const { taskBar, arrowIndent, isDelete, isSelected, onEventStart, readonly } = {
        ...props,
    };

    const textRef = useRef<SVGTextElement>(null);
    const [taskBarItem, setTaskItem] = useState<JSX.Element>(<div />);
    const [isTextInside, setIsTextInside] = useState(true);

    useEffect(() => {
        setTaskItem(taskBar.type[0]({ ...props, ...taskBar.type[1] }));
    }, [taskBar, isSelected, readonly]);

    useEffect(() => {
        if (textRef.current) {
            setIsTextInside(textRef.current.getBBox().width < taskBar.x2 - taskBar.x1);
        }
    }, [textRef, taskBar]);

    const getX = () => {
        const width = taskBar.x2 - taskBar.x1;
        const hasChild = taskBar.barChildren.length > 0;
        if (isTextInside) {
            return taskBar.x1 + width * 0.5;
        }

        return taskBar.x1 + width + arrowIndent * +hasChild + arrowIndent * 0.2;
    };

    return (
        <g
            onKeyDown={(e) => {
                // eslint-disable-next-line default-case
                switch (e.key) {
                    case 'Delete': {
                        if (isDelete) onEventStart('delete', taskBar, e);
                        break;
                    }
                }
                e.stopPropagation();
            }}
            onMouseEnter={(e) => {
                onEventStart('mouseenter', taskBar, e);
            }}
            onMouseLeave={(e) => {
                onEventStart('mouseleave', taskBar, e);
            }}
            onDoubleClick={(e) => {
                onEventStart('dblclick', taskBar, e);
            }}
            onClick={(e) => {
                onEventStart('click', taskBar, e);
            }}
            onFocus={() => {
                onEventStart('select', taskBar);
            }}
        >
            {taskBarItem}
            {/* {isTextInside ? (
                <BarLabelInside x={getX()} y={taskBar.y + taskHeight * 0.5} ref={textRef}>
                    {taskBar.name}
                </BarLabelInside>
            ) : (
                <BarLabelOutside x={getX()} y={taskBar.y + taskHeight * 0.5} ref={textRef}>
                    {taskBar.name}
                </BarLabelOutside>
            )} */}
        </g>
    );
};
