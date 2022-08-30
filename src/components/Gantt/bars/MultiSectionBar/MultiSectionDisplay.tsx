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
    theme,
}) => {
    const fill = () => {
        if (theme?.fill) {
            if (Array.isArray(theme?.fill)) {
                return isSelected ? theme?.fill[1] : theme?.fill[0];
            }

            return theme?.fill;
        }

        return isSelected ? '#6565f6' : '#9292fc';
    };

    return (
        <g onMouseDown={onMouseDown}>
            <rect
                x={x + 0.5}
                width={width}
                y={y + 0.5}
                height={height}
                ry={2}
                rx={2}
                fill={isSelected ? '#eee' : '#fff'}
                style={{ userSelect: 'none', strokeWidth: 1, stroke: '#666' }}
            />
            {sectionXPositions?.map((p: number) => (
                <rect
                    key={p}
                    x={x + 0.5}
                    width={width * p}
                    y={y + 0.5}
                    height={height}
                    ry={2}
                    rx={2}
                    fill={fill()}
                    fillOpacity={0.3}
                />
            ))}
        </g>
    );
};
