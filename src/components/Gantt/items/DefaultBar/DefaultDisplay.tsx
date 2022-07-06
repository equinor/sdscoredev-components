import React from 'react';

type BarDisplayProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    isSelected: boolean;
    /* progress start point */
    progressX: number;
    progressWidth: number;

    onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
};
export const BarDisplay: React.FC<BarDisplayProps> = ({
    x,
    y,
    width,
    height,
    isSelected,
    progressX,
    progressWidth,
    onMouseDown,
}) => {
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
