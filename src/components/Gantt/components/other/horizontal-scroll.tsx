import React, { SyntheticEvent, useRef, useEffect } from 'react';
import { Scroll, ScrollWrapper } from './horizontal-scroll.style';

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
            dir="ltr"
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
