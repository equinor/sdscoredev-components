import React, { Children, useContext, useEffect } from "react";
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

export const TableToolbar: React.FC = ({ children }) => {
    const dispatch: any = useContext(DispatchContext);
    
    return (
        <Wrapper>
            <Left></Left>
            <Right>{children}</Right>
        </Wrapper>
    );
};
