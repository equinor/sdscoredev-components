import React, { forwardRef, ReactChild, ReactFragment, ReactPortal, RefAttributes } from 'react';
import styled from 'styled-components';
import { ToolbarProps } from '.';

const Wrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 12px;
    align-items: center;
    padding-bottom: 16px;
`;

const Left = styled.div`
    justify-content: left;
    width: 100%;
    display: inline-flex;
    align-items: center;
`;

const Right = styled.div`
    justify-content: right;
    width: 100%;
    display: inline-flex;
    align-items: center;
`;

const RightInner = styled.div`
    padding-left: 16px;
`;

export type InternalToolbarProps = {
    components?: (ReactChild | ReactFragment | ReactPortal)[];
} & ToolbarProps;

export const Toolbar: React.FC<InternalToolbarProps & RefAttributes<HTMLDivElement>> = forwardRef((props, ref) => {
    const { children, components } = props;
    // if (!components?.length && !children) return <></>;

    console.log('test');
    return (
        <Wrapper ref={ref}>
            <Left>
                {components
                    ?.filter((x: any) => x.props.placement.endsWith('left') || !x.props.placement)
                    .map((component: any, index: number) => {
                        const key = `lt-Index: ${index}`;
                        return <React.Fragment key={key}>{component.props.children}</React.Fragment>;
                    })}
            </Left>
            <Right>
                {children}

                {components
                    ?.filter((x: any) => x.props.placement.endsWith('right'))
                    .map((component: any, index: number) => {
                        const key = `rt-Index: ${index}`;
                        return <RightInner key={key}>{component.props.children}</RightInner>;
                    })}
            </Right>
        </Wrapper>
    );
});
