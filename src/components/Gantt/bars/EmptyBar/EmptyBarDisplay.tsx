import React from 'react';
import { DisplayProps } from '../types';

export const EmptyBarDisplay: React.FC<DisplayProps> = ({ x, y, width, height, onMouseDown }) => {
    return (
        <g onMouseDown={onMouseDown}>
            <rect
                x={x + 0.5}
                width={width}
                y={y + 0.5}
                height={height}
                ry={2}
                rx={2}
                fillOpacity={0.1}
                style={{ userSelect: 'none', strokeWidth: 1, stroke: '#666' }}
            />
        </g>
    );
};
