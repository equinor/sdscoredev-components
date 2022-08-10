import React, { SyntheticEvent, useRef, useEffect } from 'react';
import styled from 'styled-components';

export const Scroll = styled.div`
    overflow: hidden auto;
    width: 17px;
    flex-shrink: 0;
    /*firefox*/
    scrollbar-width: thin;

    &::-webkit-scrollbar {
        width: 1.1rem;
        height: 1.1rem;
    }
    &::-webkit-scrollbar-corner {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        border: 6px solid transparent;
        background: rgba(0, 0, 0, 0.2);
        background: var(--palette-black-alpha-20, rgba(0, 0, 0, 0.2));
        border-radius: 10px;
        background-clip: padding-box;
    }
    &::-webkit-scrollbar-thumb:hover {
        border: 4px solid transparent;
        background: rgba(0, 0, 0, 0.3);
        background: var(--palette-black-alpha-30, rgba(0, 0, 0, 0.3));
        background-clip: padding-box;
    }
`;

export const VerticalScroll: React.FC<{
    scroll: number;
    ganttHeight: number;
    ganttFullHeight: number;
    headerHeight: number;
    onScroll: (event: SyntheticEvent<HTMLDivElement>) => void;
}> = ({ scroll, ganttHeight, ganttFullHeight, headerHeight, onScroll }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scroll;
        }
    }, [scroll]);

    return (
        <Scroll
            style={{
                height: ganttHeight,
                marginTop: headerHeight,
                marginLeft: '-17px',
            }}
            onScroll={onScroll}
            ref={scrollRef}
        >
            <div style={{ height: ganttFullHeight, width: 1 }} />
        </Scroll>
    );
};
