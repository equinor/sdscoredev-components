/* eslint-disable no-multi-str */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Icon, Tooltip, Button, Menu as EdsMenu, Accordion } from '@equinor/eds-core-react';
import { camelize } from '../helpers';
import { LayoutProps } from './Layout';
import { DispatchContext, StateContext } from './LayoutStore';

const ChildItem = styled.div<any>`
    margin: 0;
    padding-left: 36px;
    height: 48px;
    align-items: center;
    display: flex;
    position: relative;
    color: ${(props) => (props.active ? '#007079' : 'none')};
    /* background: ${(props: any) => (props.active ? '#E6FAEC' : 'none')}; */
    font-weight: ${(props) => (props.active ? 600 : 500)};

    & > span {
        line-height: 20px;
        font-size: 14px;
        padding-left: 32px;
    }

    ${(props) => {
        if (props.active) return '';

        return ' \
            &:hover { \
                color: #3D3D3D; \
                background-color: #F7F7F7; \
                cursor: pointer; \
            } \
        ';
    }}
`;

const Marker = styled.div<{ index: number; count: number; active: boolean }>`
    background: #f7f7f7;
    width: 4px;
    margin-right: 32px;
    position: absolute;

    ${(props) => {
        if (props.index === 0) {
            return ' \
                border-top-left-radius: 3px; \
                border-top-right-radius: 3px; \
                height: 36px; \
                bottom: 0; \
            ';
        }

        if (props.index === props.count - 1) {
            return ' \
                border-bottom-left-radius: 3px; \
                border-bottom-right-radius: 3px; \
                height: 36px; \
                top: 0; \
            ';
        }

        return ' \
            height: 100%; \
        ';
    }}
`;

const ActiveMarker = styled.div`
    background: #007079;
    width: 4px;
    margin-right: 32px;
    position: absolute;
    border-radius: 3px;
    height: 24px;
`;

const Parent = styled(Button)<any>`
    width: 100%;
    padding: 0;
    align-items: center;
    border: none;
    border-bottom: 1px solid #dcdcdc;
    border-radius: 0;
    font-size: 1rem;
    height: ${(props) => `${props.menuLinkHeight}px`};
    background: ${(props) => (props.active ? '#E6FAEC' : 'none')};
    color: ${(props) => (props.active ? '#3D3D3D' : '#3D3D3D')};
    font-weight: ${(props) => (props.active ? 600 : 500)};

    &:hover {
        color: ${(props) => (props.active ? '#3D3D3D' : '#3D3D3D')};
        background-color: ${(props) => (props.active ? '#E6FAEC' : '#F7F7F7')};
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #dcdcdc;
        cursor: pointer;
    }

    & > span {
        justify-content: unset;
        grid-template-columns: min-content max-content min-content;

        & > svg {
            margin: ${(props) => `0 ${(props.menuLinkHeight - 24) / 4}px 0 ${(props.menuLinkHeight - 24) / 2}px`};
        }
    }
`;

const StyledMenu = styled(EdsMenu)`
    border-radius: 4px;
    width: 216px;

    > div {
        padding-bottom: 0;
    }
`;

const Section = styled(EdsMenu.Section)`
    &:first-child {
        display: 'none';
    }
`;

const PopupMenuItem = styled(EdsMenu.Item)`
    background: transparent;

    span {
        color: ${(props: any) => (props.active ? '#007079' : '#3d3d3d')};
        font-weight: ${(props: any) => (props.active ? 600 : 500)};
        padding-left: 26px;
    }

    ${(props: any) => {
        if (props.active) {
            return ' \
                &:hover { \
                    color: #3D3D3D; \
                    background-color: transparent; \
                    cursor: default; \
                } \
            ';
        }

        return ' \
            &:hover { \
                color: #3D3D3D; \
                background-color: #F7F7F7; \
                cursor: pointer; \
            } \
        ';
    }}
`;

export const ChildrenPanel = styled(Accordion.Panel)`
    padding: 0;
    border: 0;
    min-height: 0;
    border-bottom: 1px solid rgba(220, 220, 220, 1);
`;

export type MenuItemProps = {
    /**
     * Visible name
     */
    name?: string;
    /**
     * Icon component
     */
    icon?: any;
    /**
     * Redirect path, should be consistent with the route paths
     */
    to?: string;
    /**
     * onClick callback for custom implementation. Should not be used with `to` prop.
     */
    onClick?: Function;
    /**
     * children containing  `<MenuItemProps>`
     */
    childItems?: Array<MenuItemProps>;
    /**
     * Custom styling
     */
    style?: any;
    /**
     * Custom tooltip, if set to false, disable tooltip for this item
     */
    tooltip?: boolean | string;
};

export const MenuItem: React.FC<MenuItemProps & LayoutProps> = (props) => {
    const { name, childItems, icon, to, onClick, style, menuLinkHeight } = props;
    const [open, setOpen] = useState<boolean>(false);
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const location = useLocation();
    const history = useNavigate();

    useEffect(() => {
        if (!state.menuOpen) {
            setOpen(false);
        }
    }, [state.menuOpen]);

    const isActive = (item: MenuItemProps) => {
        if (item.childItems) {
            return !!item.childItems.find((x) => x.to === location.pathname);
        }

        return location.pathname === item.to;
    };

    const handleClick = (item: MenuItemProps) => {
        if (item.onClick) {
            item.onClick();
        } else if (item.to) history(item.to);
    };

    if (childItems && !state.menuOpen) {
        return (
            <>
                <Tooltip placement="right" title={name} enterDelay={open ? 9999999 : 100}>
                    <Parent
                        menuLinkHeight={menuLinkHeight}
                        ref={anchorRef}
                        id="anchor-complex"
                        aria-controls="menu-complex"
                        aria-haspopup="true"
                        aria-expanded={open}
                        onClick={() => (open ? setOpen(false) : setOpen(true))}
                        active={isActive(props)}
                        data-cy={`MenuItem-${camelize(name || '')}`}
                    >
                        {icon}
                    </Parent>
                </Tooltip>
                <StyledMenu
                    id="menu-complex"
                    aria-labelledby="anchor-complex"
                    open={open}
                    anchorEl={anchorRef.current}
                    onClose={() => setOpen(false)}
                    placement="right-start"
                >
                    <Section title={name?.toUpperCase()}>
                        {childItems.map((childItem: MenuItemProps, index) => (
                            <PopupMenuItem
                                // eslint-disable-next-line react/no-array-index-key
                                key={index}
                                onClick={() => handleClick(childItem)}
                                active={isActive(childItem)}
                                data-cy={`MenuItem-${camelize(childItem.name || '')}`}
                            >
                                <Marker index={index} count={childItems.length} active={isActive(childItem)} />
                                {isActive(childItem) && <ActiveMarker />}
                                <span>{childItem.name}</span>
                            </PopupMenuItem>
                        ))}
                    </Section>
                </StyledMenu>
            </>
        );
    }

    if (childItems && state.menuOpen) {
        return (
            <>
                <Parent
                    menuLinkHeight={menuLinkHeight}
                    onClick={() => (open ? setOpen(false) : setOpen(true))}
                    active={isActive(props)}
                    data-cy={`MenuItem-${camelize(name || '')}`}
                >
                    {icon} <span>{name}</span> <Icon name={open ? 'chevron_up' : 'chevron_down'} size={24} />
                </Parent>
                <ChildrenPanel hidden={!open}>
                    {childItems.map((childItem: MenuItemProps, index) => (
                        <ChildItem
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            onClick={() => handleClick(childItem)}
                            active={isActive(childItem)}
                            data-cy={`MenuItem-${camelize(childItem.name || '')}`}
                        >
                            <Marker index={index} count={childItems.length} active={isActive(childItem)} />
                            {isActive(childItem) && <ActiveMarker />}
                            <span>{childItem.name}</span>
                        </ChildItem>
                    ))}
                </ChildrenPanel>
            </>
        );
    }

    if (!childItems && !state.menuOpen) {
        return (
            <Tooltip
                placement="right"
                title={name}
                enterDelay={typeof props.tooltip === 'boolean' && props.tooltip === false ? 9999999 : 100}
            >
                <Parent
                    menuLinkHeight={menuLinkHeight}
                    style={style}
                    onClick={() => handleClick(props)}
                    active={isActive(props)}
                    data-cy={`MenuItem-${camelize(name || '')}`}
                >
                    {icon}
                </Parent>
            </Tooltip>
        );
    }

    return (
        <Parent
            menuLinkHeight={menuLinkHeight}
            style={style}
            onClick={() => handleClick(props)}
            active={isActive(props)}
            data-cy={`MenuItem-${camelize(name || '')}`}
        >
            {icon} <span>{name}</span>
        </Parent>
    );
};
