import React, { Children, createRef, ReactChild, ReactFragment, ReactPortal, useEffect, useRef } from 'react';
import styled from 'styled-components';

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
    gap: 16px;
`;

const RightInner = styled.div`
    padding-left: 16px;
`;

export type ToolbarProps = {
    components?: (ReactChild | ReactFragment | ReactPortal)[];
    shareDOM?: any;
    id?: string;
};

const Toolbar: React.FC<ToolbarProps> = ({ children, components, shareDOM, id }) => {
    const toolbarRef = createRef<any>();

    /**
     * If shareDOM is set, the DOM reference is shared to the outside of the dataTable
     */
    // eslint-disable-next-line react/no-find-dom-node
    useEffect(() => {
        if (shareDOM) shareDOM(toolbarRef.current);
    });

    return (
        <Wrapper ref={toolbarRef}>
            <Left id={`${id}-left`} className="top-left">
                {components
                    ?.filter((x: any) => x.props.placement.endsWith('left') || !x.props.placement)
                    .map((component: any, index: number) => {
                        const key = `lt-Index: ${index}`;
                        return <React.Fragment key={key}>{component.props.children}</React.Fragment>;
                    })}
            </Left>
            <Right id={`${id}-right`} className="top-right">
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
};

export default Toolbar;
