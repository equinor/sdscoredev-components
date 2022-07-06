import React from 'react';

type MultiSectionDisplayProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    progress: number[];
    isSelected: boolean;

    onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
};
export const MultiSectionDisplay: React.FC<MultiSectionDisplayProps> = ({
    x,
    y,
    width,
    height,
    progress,
    isSelected,
    onMouseDown,
}) => {
    return (
        <g onMouseDown={onMouseDown}>
            <rect
                x={x}
                width={width}
                y={y}
                height={height}
                ry={2}
                rx={2}
                fill={isSelected ? '#eee' : '#fff'}
                style={{ userSelect: 'none', strokeWidth: 1, stroke: '#666' }}
            />
            {progress.map((p: number) => (
                <rect
                    key={p}
                    x={x}
                    width={width * p}
                    y={y}
                    height={height}
                    ry={2}
                    rx={2}
                    fill={isSelected ? '#6565f6' : '#9292fc'}
                    fillOpacity={0.3}
                />
            ))}
        </g>
    );
};
