import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '@equinor/eds-core-react';

import { StateContext } from './LayoutStore';
import { EquinorLogo } from './Svg';
import { ILayout, IMenuItem } from './types';

const Parent = styled(Button)<any>`
    width: 100%;
    padding: 0;
    align-items: center;
    border: none;
    border-bottom: 1px solid #dcdcdc;
    border-radius: 0;
    font-size: 1rem;
    height: ${(props) => `${props.menuLinkHeight}px`};
    background: ${(props: any) => (props.active ? 'rgb(36, 56, 70)' : 'none')};
    color: ${(props: any) => (props.active ? 'rgb(247, 247, 247)' : 'rgba(61,61,61,1)')};

    &:hover {
        color: ${(props: any) => (props.active ? 'rgb(247, 247, 247)' : '#3D3D3D')};
        background-color: ${(props: any) => (props.active ? 'rgb(36, 55, 70)' : '#F7F7F7')};
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #dcdcdc;
        cursor: pointer;
    }

    & > span {
        & > svg {
            margin: ${(props) => `0 ${(props.menuLinkHeight - 24) / 2}px 0 ${(props.menuLinkHeight - 24) / 2}px`};
        }
    }
`;

export const LogoItem: React.FC<IMenuItem & ILayout> = (props) => {
    const { style, menuLinkHeight } = props;
    const [open, setOpen] = useState<boolean>(false);
    const state: any = useContext(StateContext);
    const location = useLocation();
    const history = useNavigate();

    useEffect(() => {
        if (!state.menuOpen) {
            setOpen(false);
        }
    }, [state.menuOpen]);

    const isActive = (item: IMenuItem) => {
        if (item.childItems) {
            return !!item.childItems.find((x) => x.to === location.pathname);
        }

        return location.pathname === item.to;
    };

    const handleClick = (item: IMenuItem) => {
        if (item.onClick) {
            item.onClick();
        } else if (item.to) history(item.to);
    };

    return (
        <Parent
            menuLinkHeight={menuLinkHeight}
            style={style}
            onClick={() => handleClick(props)}
            active={isActive(props)}
        >
            <EquinorLogo />
        </Parent>
    );
};
