import React from 'react';

type ActionBarDisplayProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    isSelected: boolean;
    /* progress start point */
    progressX: number;
    progressWidth: number;
    dates: Date[];
    actionBarCornerRadius: number;
    styles: {
        backgroundColor: string;
        backgroundSelectedColor: string;
        progressColor: string;
        progressSelectedColor: string;
    };
    onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
};
export const ActionBarDisplay: React.FC<ActionBarDisplayProps> = ({
    x,
    y,
    width,
    height,
    isSelected,
    progressX,
    progressWidth,
    dates,
    actionBarCornerRadius,
    styles,
    onMouseDown,
}) => {
    const getProcessColor = () => {
        return isSelected ? styles.progressSelectedColor : styles.progressColor;
    };

    const getActionBarColor = () => {
        return isSelected ? styles.backgroundSelectedColor : styles.backgroundColor;
    };

    const calculateWidth = (index: any) => {};

    return (
        <g onMouseDown={onMouseDown}>
            <rect
                x={x}
                width={width}
                y={y}
                height={height}
                ry={actionBarCornerRadius}
                rx={actionBarCornerRadius}
                fill={getActionBarColor()}
                style={{ userSelect: 'none', strokeWidth: 0 }}
            />
            {/* {dates.map((item: any, index: number) => ( */}
            <rect
                x={progressX}
                width={progressWidth}
                y={y}
                height={height}
                ry={actionBarCornerRadius}
                rx={actionBarCornerRadius}
                fill={getProcessColor()}
            />
            {/* )} */}
        </g>
    );
};
