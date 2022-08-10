import React from 'react';
import styled from 'styled-components';

export const ProgressHandle = styled.polygon`
    fill: #ddd;
    cursor: ew-resize;
    opacity: 0;
    visibility: hidden;
`;

type BarProgressHandleProps = {
    progressPoint: string;
    onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
};
export const BarProgressHandle: React.FC<BarProgressHandleProps> = ({ progressPoint, onMouseDown }) => {
    return <ProgressHandle points={progressPoint} onMouseDown={onMouseDown} />;
};
