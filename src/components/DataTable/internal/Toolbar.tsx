import React, { ReactChild, ReactElement, ReactFragment, ReactPortal, useContext } from "react";
import styled from 'styled-components';
import { DispatchContext } from "../DataTableStore";

const Wrapper = styled.div`
    justify-content: right;
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
    const dispatch: any = useContext(DispatchContext);
    
    return (
        <Wrapper>
            <Left>
                {components && components.filter((x: any) => x.props.placement === 'left' || !x.props.placement).map((component: any, index: number) => (
                    <React.Fragment key={`lt-${index}`}>
                        {component.props.children}
                    </React.Fragment>
                ))}
            </Left>
            <Right>
                {children}
            
                {components && components.filter((x: any) => x.props.placement === 'right').map((component: any, index: number) => (
                    <RightInner key={`rt-${index}`}>
                        {component.props.children}
                    </RightInner>
                ))}
            </Right>
        </Wrapper>
    );
};

export default Toolbar;
