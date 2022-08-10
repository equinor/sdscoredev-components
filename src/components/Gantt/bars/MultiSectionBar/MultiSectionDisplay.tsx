import React from 'react';
import { MultiSectionTaskBar } from '.';
import { DisplayProps } from '../types';

export const MultiSectionDisplay: React.FC<DisplayProps<MultiSectionTaskBar>> = ({
    x,
    y,
    width,
    height,
    sectionXPositions,
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
            {sectionXPositions.map((p: number) => (
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
