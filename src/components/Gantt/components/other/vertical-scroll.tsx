import React, { SyntheticEvent, useRef, useEffect } from 'react';
import { Scroll } from './vertical-scroll.style';

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