/* eslint-disable no-multi-str */
/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Accordion, Icon } from '@equinor/eds-core-react';
import styled from 'styled-components';
// import { useSelector } from 'react-redux';
// import { getQuery } from '@redux-requests/core';
// import { Plan } from 'src/types/Plan';
import { LayoutProps } from './Layout';
// import { MenuItem, MenuItemProps } from './MenuItem';
// import { LogoItem } from './LogoItem';
// import { DispatchContext, StateContext } from './LayoutStore';
// import useSessionStorage from 'functions/useSessionStorage';

export const Wrapper = styled.div<any>`
    // We want collapsed links to be square, so we use menuLinkHeight as width
    width: ${(props) => (props.collapsed ? `${props.menuLinkHeight}px` : '256px')};
    border-right: 1px solid #dcdcdc;
    background-color: #ffffff;
`;

const AccordionHeader = styled(Accordion.Header)<any>`
    height: ${(props) => `${props.menuLinkHeight}px`};
    // TODO: Make dynamic, depending on icon size and link height
    padding-left: ${(props) => `${(props.menuLinkHeight - 24) / 2}px`};
    border-right: 0;
    border-top: 0;
    background: ${(props: any) => (props.active ? '#E6FAEC' : 'none')};

    & > span {
        align-items: center;
        display: flex;
        color: ${(props: any) => (props.active ? 'rgb(247, 247, 247)' : 'none')};
    }

    & > span > svg:first-child {
        margin: 0 16px 0 0;
    }

    & > svg {
        fill: ${(props: any) => (props.active ? 'rgb(247, 247, 247)' : 'rgb(0, 112, 121)')};
    }

    & > svg:last-child {
        display: ${(props: any) => (props.collapsed ? 'none !important' : 'flex')};
    }
`;

const StyledIcon = styled(Icon)`
    margin: ${(props: any) => (props.collapsedMenu ? '0 20px' : '0 32px 0 16px')};
    overflow: initial;
`;

export const Menu: React.FC<LayoutProps> = (props) => {
    // const { menuLinkHeight } = props;
    // const state: any = useContext(StateContext);
    // const dispatch: any = useContext(DispatchContext);
    // const location = useLocation();
    // const store = useSelector((state: any) => state);
    // const [session] = useSessionStorage(window.location.origin + state.path + '|' + 'DataTable.Filter', '');

    // const { data: fetchedCurrentPlan } = getQuery<Plan>(store, { type: 'FETCH_CURRENT_PLAN' });

    // const defaultMenu: Array<MenuItemProps> = [
    //     {
    //         name: 'My plans',
    //         icon: <StyledIcon name="favorite_outlined" size={24} />,
    //         to: '/',
    //     },
    //     {
    //         name: 'All plans',
    //         icon: <StyledIcon name="search" size={24} />,
    //         to: '/plans',
    //     },
    //     {
    //         name: 'Collapse',
    //         icon: <StyledIcon name={state.menuOpen ? 'first_page' : 'last_page'} size={24} />,
    //         onClick: () => dispatch({ type: 'SET_MENU_OPEN', payload: !state.menuOpen }),
    //         style: { position: 'absolute', bottom: `${menuLinkHeight}px`, left: 0, width: '100%' },
    //     },
    // ];

    // const planMenu: Array<MenuItemProps> = [
    //     {
    //         name: 'My plans',
    //         icon: <StyledIcon name="favorite_outlined" size={24} />,
    //         to: '/',
    //     },
    //     {
    //         name: 'Plan dashboard',
    //         icon: <StyledIcon name="dashboard" size={24} />,
    //         to: `/plans/${state.params.planId}`,
    //     },
    //     {
    //         name: 'Scope',
    //         icon: <StyledIcon name="list" size={24} />,
    //         childItems: [
    //             {
    //                 name: 'Cases',
    //                 icon: <StyledIcon name="list" size={24} />,
    //                 to: `/plans/${state.params.planId}/cases`,
    //             },
    //             {
    //                 name: 'Actions',
    //                 icon: <StyledIcon name="list" size={24} />,
    //                 to: `/plans/${state.params.planId}/actions`,
    //             },

    //             // {
    //             //     name: 'Projects',
    //             //     icon: <StyledIcon name="list" size={24} />,
    //             //     to: `/plans/${state.params.planId}/projects`,
    //             // },
    //         ],
    //     },
    //     {
    //         name: 'Safran Queue',
    //         icon: <StyledIcon name="unarchive" size={24} />,
    //         to: `/plans/${state.params?.planId}/safran`,
    //     },
    //     {
    //         name: 'Framework conditions',
    //         icon: <StyledIcon name="assignment_important" size={24} />,
    //         to: `/plans/${state.params?.planId}/framework-conditions`,
    //     },
    //     // {
    //     //     name: 'Simulations',
    //     //     icon: <StyledIcon name="bar_chart" size={24} />,
    //     //     to: `/plans/${state.params.planId}/simulations`,
    //     // },
    //     // {
    //     //     name: 'Framework conditions',
    //     //     icon: <StyledIcon name="settings" size={24} />,
    //     //     to: `/plans/${state.params.planId}/conditions`,
    //     // },
    //     // {
    //     //     name: 'Versions',
    //     //     icon: <StyledIcon name="history" size={24} />,
    //     //     to: `/plans/${state.params.planId}/versions`,
    //     // },
    //     {
    //         name: 'Collapse',
    //         icon: <StyledIcon name={state.menuOpen ? 'first_page' : 'last_page'} size={24} />,
    //         onClick: () => dispatch({ type: 'SET_MENU_OPEN', payload: !state.menuOpen }),
    //         style: { position: 'absolute', bottom: `${menuLinkHeight}px`, left: 0, width: '100%' },
    //     },
    // ];

    // const adminMenu: Array<MenuItemProps> = [
    //     {
    //         name: 'Facilities',
    //         icon: <StyledIcon name="dashboard" size={24} />,
    //         to: `/admin/facilities`,
    //     },
    //     {
    //         name: 'Globals',
    //         icon: <StyledIcon name="dashboard" size={24} />,
    //         childItems: [
    //             {
    //                 name: 'Action types',
    //                 to: `/admin/action-types`,
    //             },
    //             {
    //                 name: 'Business levels',
    //                 to: `/admin/business-levels`,
    //             },
    //             {
    //                 name: 'Categories',
    //                 to: `/admin/categories`,
    //             },
    //             {
    //                 name: 'Disciplines',
    //                 to: `/admin/disciplines`,
    //             },
    //             {
    //                 name: 'Labels',
    //                 to: `/admin/labels`,
    //             },
    //             {
    //                 name: 'Triggers',
    //                 to: `/admin/triggers`,
    //             },
    //             {
    //                 name: 'Task owners',
    //                 to: `/admin/task-owners`,
    //             },
    //         ],
    //     },
    //     {
    //         name: 'Framework conditions',
    //         icon: <StyledIcon name="settings" size={24} />,
    //         to: `/admin/framework-conditions`,
    //     },
    //     {
    //         name: 'Safran settings',
    //         icon: <StyledIcon name="settings" size={24} />,
    //         to: `/admin/safran`,
    //     },
    //     {
    //         name: 'Collapse',
    //         icon: <StyledIcon name={state.menuOpen ? 'first_page' : 'last_page'} size={24} />,
    //         onClick: () => dispatch({ type: 'SET_MENU_OPEN', payload: !state.menuOpen }),
    //         style: { position: 'absolute', bottom: `${menuLinkHeight}px`, left: 0, width: '100%' },
    //     },
    // ];

    // const caseMenu: Array<MenuItemProps> = [
    //     {
    //         name: 'Cases',
    //         icon: <StyledIcon name="arrow_back" size={24} style={{ color: '#007079' }} />,
    //         to: `/plans/${state.params.planId}/cases${session && session.searchString}`,
    //     },
    //     {
    //         name: 'Key information',
    //         icon: <StyledIcon name="assignment" size={24} />,
    //         to: `/plans/${state.params.planId}/cases/${state.params.caseId}`,
    //     },
    //     {
    //         name: 'Risk evaluation',
    //         icon: <StyledIcon name="warning_outlined" size={24} />,
    //         to: `/plans/${state.params.planId}/cases/${state.params.caseId}/risk`,
    //     },
    //     {
    //         name: 'Actions',
    //         icon: <StyledIcon name="link" size={24} />,
    //         to: `/plans/${state.params.planId}/cases/${state.params.caseId}/actions`,
    //     },
    //     {
    //         name: 'Audit log',
    //         icon: <StyledIcon name="history" size={24} />,
    //         to: `/plans/${state.params.planId}/cases/${state.params.caseId}/audits`,
    //     },
    //     {
    //         name: 'Collapse',
    //         icon: <StyledIcon name={state.menuOpen ? 'first_page' : 'last_page'} size={24} />,
    //         onClick: () => dispatch({ type: 'SET_MENU_OPEN', payload: !state.menuOpen }),
    //         style: { position: 'absolute', bottom: `${menuLinkHeight}px`, left: 0, width: '100%' },
    //     },
    // ];

    // const actionMenu: Array<MenuItemProps> = [
    //     {
    //         name: 'Actions',
    //         icon: <StyledIcon name="arrow_back" size={24} style={{ color: '#007079' }} />,
    //         to: `/plans/${state.params.planId}/actions${session && session.searchString}`,
    //     },
    //     {
    //         name: 'Key information',
    //         icon: <StyledIcon name="assignment" size={24} />,
    //         to: `/plans/${state.params.planId}/actions/${state.params.actionId}`,
    //     },
    //     {
    //         name: 'Cases',
    //         icon: <StyledIcon name="link" size={24} />,
    //         to: `/plans/${state.params.planId}/actions/${state.params.actionId}/cases`,
    //     },
    //     {
    //         name: 'Audit log',
    //         icon: <StyledIcon name="history" size={24} />,
    //         to: `/plans/${state.params.planId}/actions/${state.params.actionId}/audits`,
    //     },
    //     {
    //         name: 'Collapse',
    //         icon: <StyledIcon name={state.menuOpen ? 'first_page' : 'last_page'} size={24} />,
    //         onClick: () => dispatch({ type: 'SET_MENU_OPEN', payload: !state.menuOpen }),
    //         style: { position: 'absolute', bottom: `${menuLinkHeight}px`, left: 0, width: '100%' },
    //     },
    // ];

    // const getMenu = () => {
    //     if (location.pathname.includes('/actions/')) return actionMenu;
    //     if (location.pathname.includes('/cases/')) return caseMenu;
    //     if (location.pathname.startsWith('/plans/')) {
    //         if (fetchedCurrentPlan?.isPlanLive) {
    //             return planMenu.filter((x) => x.name !== 'Framework conditions');
    //         }
    //         return planMenu.filter((x) => x.name !== 'Safran Queue');
    //     }
    //     if (location.pathname.startsWith('/admin/')) return adminMenu;
    //     return defaultMenu;
    // };

    // return (
    //     <Wrapper {...props} collapsed={!state.menuOpen} data-cy="control-center-menu">
    //         <Accordion chevronPosition="right" style={{ position: 'relative', height: '100%' }}>
    //             {getMenu().map((item: MenuItemProps, index) => (
    //                 <MenuItem key={index} {...props} {...item} />
    //             ))}
    //             <LogoItem {...props} style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }} />
    //         </Accordion>
    //     </Wrapper>
    // );

    return <></>;
};
