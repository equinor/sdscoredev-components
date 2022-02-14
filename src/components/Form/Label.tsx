import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.span`
    display: inline-flex;
    width: 100%;
    justify-content: space-between;
`;

export const Item = styled.div`
    height: 16px;
    margin-top: 0px;
    font-size: 0.750rem;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: #6f6f6f;
    margin-left: 8px;
    font-weight: 500;
    line-height: 1.333em;
`;

type LabelProps = {
    meta?: string;
};

export const Label: React.FC<LabelProps> = (props) => {
    const { children, meta } = props;

    return (
        <Wrapper>
            <Item>{children}</Item>
            {meta && (
                <Item>{meta}</Item>
            )}
        </Wrapper>
    )

};
