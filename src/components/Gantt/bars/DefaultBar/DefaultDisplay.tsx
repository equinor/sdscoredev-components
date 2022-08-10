import React from 'react';

type DefaultDisplayProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    isSelected: boolean;
    onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
};
export const DefaultDisplay: React.FC<DefaultDisplayProps> = ({ x, y, width, height, isSelected, onMouseDown }) => {
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
        </g>
    );
};
