import React from 'react';
import { DateHandle } from './bar.style';

type BarDateHandleProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    barCornerRadius: number;
    onMouseDown: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
};
export const BarDateHandle: React.FC<BarDateHandleProps> = ({ x, y, width, height, barCornerRadius, onMouseDown }) => {
    return (
        <DateHandle
            x={x}
            y={y}
            width={width}
            height={height}
            ry={barCornerRadius}
            rx={barCornerRadius}
            onMouseDown={onMouseDown}
        />
    );
};
