import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Bar, NuggetProp } from '../bars/types';

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

export const Nugget: React.FC<NuggetProp> = (props) => {
    const { taskBar, taskHeight, nugget } = {
        ...props,
    };

    // const textRef = useRef<SVGTextElement>(null);
    // const [taskBarItem, setTaskItem] = useState<JSX.Element>(<div />);
    // const [isTextInside, setIsTextInside] = useState(true);

    // useEffect(() => {
    //     if (nugget) {
    //         setTaskItem(nugget[0]({ ...props, ...nugget[1] }));
    //     }
    // }, [taskBar]);

    // useEffect(() => {
    //     if (textRef.current) {
    //         setIsTextInside(textRef.current.getBBox().width < taskBar.x2 - taskBar.x1);
    //     }
    // }, [textRef, taskBar]);

    // const getX = () => {
    //     const width = taskBar.x2 - taskBar.x1;
    //     const hasChild = taskBar.barChildren.length > 0;
    //     if (isTextInside) {
    //         return taskBar.x1 + width * 0.5;
    //     }

    //     return taskBar.x1 + width + +hasChild + 0.2;
    // };

    return (
        <g>
            {React.createElement(nugget[0], { ...props, ...nugget[1] })}
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
