import React from 'react';
import { TaskBar } from '../bars/types';

type ArrowProps = {
    taskFrom: TaskBar;
    taskTo: TaskBar;
    rowHeight: number;
    taskHeight: number;
    arrowIndent: number;
};
export const Arrow: React.FC<ArrowProps> = ({ taskFrom, taskTo, rowHeight, taskHeight, arrowIndent }) => {
    const [path, trianglePoints] = drownPathAndTriangle(taskFrom, taskTo, rowHeight, taskHeight, arrowIndent);

    return (
        <g className="arrow">
            <path strokeWidth="1.5" d={path} fill="none" />
            <polygon points={trianglePoints} />
        </g>
    );
};

const drownPathAndTriangle = (
    taskFrom: TaskBar,
    taskTo: TaskBar,
    rowHeight: number,
    taskHeight: number,
    arrowIndent: number,
) => {
    const indexCompare = taskFrom.index > taskTo.index ? -1 : 1;
    const taskToEndPosition = taskTo.y + taskHeight / 2;
    const taskFromEndPosition = taskFrom.x2 + arrowIndent * 2;
    const taskFromHorizontalOffsetValue = taskFromEndPosition < taskTo.x1 ? '' : `H ${taskTo.x1 - arrowIndent}`;
    const taskToHorizontalOffsetValue =
        taskFromEndPosition > taskTo.x1 ? arrowIndent : taskTo.x1 - taskFrom.x2 - arrowIndent;

    const path = `M ${taskFrom.x2} ${taskFrom.y + taskHeight / 2} 
  h ${arrowIndent} 
  v ${(indexCompare * rowHeight) / 2} 
  ${taskFromHorizontalOffsetValue}
  V ${taskToEndPosition} 
  h ${taskToHorizontalOffsetValue}`;

    const trianglePoints = `${taskTo.x1},${taskToEndPosition} 
  ${taskTo.x1 - 5},${taskToEndPosition - 5} 
  ${taskTo.x1 - 5},${taskToEndPosition + 5}`;
    return [path, trianglePoints];
};
