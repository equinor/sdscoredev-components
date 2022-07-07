import React, { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1em;
`;

export const CompactDialogAction: FC = ({ children }) => {
    return <Wrapper>{children}</Wrapper>;
};
