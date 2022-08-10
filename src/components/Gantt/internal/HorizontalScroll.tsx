import React, { SyntheticEvent, useRef, useEffect } from 'react';
import styled from 'styled-components';

export const ScrollWrapper = styled.div`
    overflow: auto;
    max-width: 100%;
    /*firefox*/
    scrollbar-width: thin;
    /*iPad*/
    height: 1.1rem;

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

    @media only screen and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) {
        .scrollWrapper {
            -webkit-overflow-scrolling: touch;
        }
    }
`;

export const Scroll = styled.div`
    height: 1px;
`;

export const HorizontalScroll: React.FC<{
    scroll: number;
    svgWidth: number;
    taskListWidth: number;
    onScroll: (event: SyntheticEvent<HTMLDivElement>) => void;
}> = ({ scroll, svgWidth, taskListWidth, onScroll }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scroll;
        }
    }, [scroll]);

    return (
        <ScrollWrapper
            style={{
                margin: `0px 0px 0px ${taskListWidth}px`,
            }}
            onScroll={onScroll}
            ref={scrollRef}
        >
            <Scroll style={{ width: svgWidth }} />
        </ScrollWrapper>
    );
};
