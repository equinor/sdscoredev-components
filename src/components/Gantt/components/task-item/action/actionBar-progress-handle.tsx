import React from 'react';
import { ProgressHandle } from './actionBar.style';

type ActionBarProgressHandleProps = {
    hidden: boolean;
    progressPoint: string;
    onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
};
export const ActionBarProgressHandle: React.FC<ActionBarProgressHandleProps> = ({
    progressPoint,
    onMouseDown,
    hidden,
}) => {
    return <ProgressHandle hidden={hidden} points={progressPoint} onMouseDown={onMouseDown} />;
};
