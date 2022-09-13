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
                fill="#9d9d9d"
                x={taskBar.x1 + 0.5}
                width={taskBar.x2 - taskBar.x1}
                y={taskBar.y}
                height={taskBar.height}
                rx={2}
                ry={2}
                style={{ userSelect: 'none', strokeWidth: 1, stroke: '#3e3e3e' }}
            />
        </ReferenceWrapper>
    );
};
