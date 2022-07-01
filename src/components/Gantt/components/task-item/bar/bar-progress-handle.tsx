import React from 'react';
import { ProgressHandle } from './bar.style';

type BarProgressHandleProps = {
    progressPoint: string;
    onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
};
export const BarProgressHandle: React.FC<BarProgressHandleProps> = ({ progressPoint, onMouseDown }) => {
    return <ProgressHandle points={progressPoint} onMouseDown={onMouseDown} />;
};
