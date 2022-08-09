import React from 'react';
import styled from 'styled-components';
import { TopBar, Typography } from '@equinor/eds-core-react';
import { Logo } from './Svg';

const Wrapper = styled(TopBar.Header)`
    padding-right: 16px;
    border-right: 1px solid #dcdcdc;
    grid-gap: 16px;
    cursor: pointer;
`;

type ILogo = {};

export const Header: React.FC<ILogo> = () => (
    <Wrapper
        onClick={() => {
            window.location.href = '/';
        }}
    >
        <Logo />
        <Typography variant="h6" style={{ color: '#3D3D3D' }}>
            THELMA
        </Typography>
    </Wrapper>
);
