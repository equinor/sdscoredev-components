import React from 'react';
import styled from 'styled-components';
import { Bar } from '../types';
import { EmptyBarType } from '.';
import { EmptyBarDisplay } from './EmptyBarDisplay';

const Wrapper = styled.g`
    cursor: pointer;
    outline: none;

    &:hover .barHandle {
        visibility: visible;
        opacity: 1;
    }
`;

export const EmptyBar: React.FC<Bar<EmptyBarType>> = (props) => {
    const { taskBar, isDateChangeable = true, onEventStart, isSelected, readonly } = props;

    return (
        <Wrapper>
            <EmptyBarDisplay
                x={taskBar.x1}
                y={taskBar.y}
                width={taskBar.x2 - taskBar.x1}
                height={taskBar.height}
                isSelected={isSelected}
                onMouseDown={(e: any) => {
                    // eslint-disable-next-line no-unused-expressions
                    isDateChangeable && !readonly && onEventStart('move', taskBar, e);
                }}
            />
        </Wrapper>
    );
};
