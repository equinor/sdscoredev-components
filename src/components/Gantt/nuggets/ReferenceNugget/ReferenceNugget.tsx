import React from 'react';
import styled from 'styled-components';
import { Bar } from '../../bars/types';

export const ReferenceWrapper = styled.g`
    cursor: pointer;
    outline: none;
`;

export type ReferenceNuggetProps = {};

export const ReferenceNugget: React.FC<Bar<ReferenceNuggetProps>> = (props) => {
    const { taskBar } = props;

    return (
        <ReferenceWrapper tabIndex={0}>
            <rect
                fill="#ffffff"
                fillOpacity="0"
                strokeDasharray="5,3"
                stroke="#006269"
                strokeWidth="1"
                x={taskBar.x1 + 0.5}
                width={taskBar.x2 - taskBar.x1}
                y={taskBar.y + 0.5}
                height={taskBar.height}
                rx={2}
                ry={2}
                style={{ userSelect: 'none' }}
            />
        </ReferenceWrapper>
    );
};
