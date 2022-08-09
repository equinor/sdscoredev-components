import React from 'react';
import { DateHandle } from './actionBar.style';

type ActionBarDateHandleProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    hidden: boolean;
    actionBarCornerRadius: number;
    onMouseDown: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
};
export const ActionBarDateHandle: React.FC<ActionBarDateHandleProps> = ({
    x,
    y,
    width,
    height,
    hidden,
    actionBarCornerRadius,
    onMouseDown,
}) => {
    return (
        <DateHandle
            x={x}
            y={y}
            width={width}
            height={height}
            hidden={hidden}
            ry={actionBarCornerRadius}
            rx={actionBarCornerRadius}
            onMouseDown={onMouseDown}
        />
    );
};
