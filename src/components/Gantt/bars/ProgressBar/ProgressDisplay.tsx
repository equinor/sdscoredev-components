import React from 'react';
import { ProgressTaskBar } from '.';
import { DisplayProps } from '../types';

export const ProgressDisplay: React.FC<DisplayProps<ProgressTaskBar>> = (props) => {
    const { x, y, width, height, isSelected, onMouseDown, progressX, progressWidth } = props;

    const getProcessColor = () => {
        return isSelected ? '#8282f5' : '#a3a3ff';
    };

    const getBarColor = () => {
        return isSelected ? '#aeb8c2' : '#b8c2cc';
    };

    return (
        <g onMouseDown={onMouseDown}>
            <rect
                x={x}
                width={width}
                y={y}
                height={height}
                ry={2}
                rx={2}
                fill={getBarColor()}
                style={{ userSelect: 'none', strokeWidth: 0 }}
            />
            <rect x={progressX} width={progressWidth} y={y} height={height} ry={2} rx={2} fill={getProcessColor()} />
        </g>
    );
};
