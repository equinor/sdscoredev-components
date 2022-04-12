import React, { ReactChild, ReactFragment, ReactPortal } from "react";
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
`;

const RightInner = styled.div`
    padding-left: 16px;
`;

export type ToolbarProps = {
    components?: (ReactChild | ReactFragment | ReactPortal)[];
}

const Toolbar: React.FC<ToolbarProps> = ({ children, components }) => {

    console.log(components)

    if (!components?.length && !children) return <></>;

    console.log(components)
    
    return (
        <Wrapper>
            <Left>
                {components?.filter((x: any) => x.props.placement.endsWith('left') || !x.props.placement).map((component: any, index: number) => (
                    <React.Fragment key={`lt-${index}`}>
                        {component.props.children}
                    </React.Fragment>
                ))}
            </Left>
            <Right>
                {children}
            
                {components?.filter((x: any) => x.props.placement.endsWith('right')).map((component: any, index: number) => (
                    <RightInner key={`rt-${index}`}>
                        {component.props.children}
                    </RightInner>
                ))}
            </Right>
        </Wrapper>
    );
};

export default Toolbar;
