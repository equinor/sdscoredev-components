import React, { Children, cloneElement, PropsWithChildren, ReactElement, useContext } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{count: number, gap: number}>`
    display: inline-flex;
    flex-wrap: wrap;
    gap: ${(props) => `${props.gap}px`};
    max-width: 100%;
    align-items: center;
    float: right;
    height: 48px;
`

/**
 * Wrapper for the individual input components
 * TODO: Refactor
 */
const FixedInner = styled.div<{count: number, fixed: number, gap: number}>`
    min-width: ${(props) => `${props.fixed}px`};
    /* width: ${(props) => `calc(100% / ${props.count} - ${props.gap * (props.count - 1) / props.count}px)`}; */
`

const DynamicInner = styled.div<{count: number, gap: number}>`
    /* width: ${(props) => `calc(100% / ${props.count} - ${props.gap * (props.count - 1) / props.count}px)`}; */
`

type RowProps = {
    /**
     * Sets min-width of the input component to a fixed width. 
     * When window width shrinks, the minimum width of input item 
     * will not fall bellow this value.
     */
    fixed?: number;
}

export const Actions: React.FC<RowProps> = (props) => {
    const { fixed } = props;
    const gap = 10;

    const children = Children.toArray(props.children)


    return (
        <Wrapper count={children.length} gap={gap}>
            {Children.map(children, (child, index) => {
                if (fixed) {
                    return (
                        <FixedInner fixed={fixed} count={children.length} gap={gap}>
                            {cloneElement(child as ReactElement<PropsWithChildren<any>>, {})}
                        </FixedInner>
                    ) 
                } else {
                    return (
                        <DynamicInner count={children.length} gap={gap}>
                            {cloneElement(child as ReactElement<PropsWithChildren<any>>, {})}
                        </DynamicInner>
                    ) 
                }
            })} 
        </Wrapper>
    );
};
