import React from 'react';
import styled from 'styled-components';

export const DateHandle = styled.rect`
    fill: #ddd;
    cursor: ew-resize;
    opacity: 0;
    visibility: hidden;
`;

type BarDateHandleProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    onMouseDown: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
};
export const BarDateHandle: React.FC<BarDateHandleProps> = ({ x, y, width, height, onMouseDown }) => {
    return <DateHandle x={x} y={y} width={width} height={height} ry={2} rx={2} onMouseDown={onMouseDown} />;
};
