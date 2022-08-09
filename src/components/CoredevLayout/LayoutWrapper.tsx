import React, { useContext } from 'react';
import styled from 'styled-components';
import { TopBar } from '@equinor/eds-core-react';
import Content from './Content';
import { StateContext } from './LayoutStore';
import { LayoutProps } from './Layout';
import { Header } from './Header';
import { Breadcrumbs } from './Breadcrumbs';
// import Actions from './Actions';

const Wrapper = styled.div<any>`
    display: grid;
    grid-template-rows: auto max-content;
    gap: 0px 0px;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;

const Container = styled.div<any>`
    margin-top: ${(props: any) => `${props.headerHeight}px`};
    display: grid;
    grid-template-columns: ${(props: any) => {
        const menuWidth = props.state.menuOpen ? '257px' : '73px';
        const sideSheetWidth = props.state.sideSheet ? 'auto min-content' : 'auto';

        return `${menuWidth} ${sideSheetWidth}`;
    }};
    overflow: hidden;
`;

const HeaderWrapper = styled(TopBar)`
    padding: 8px 20px;
    overflow: hidden;
    width: 100%;
    position: fixed;
    grid-column-gap: 20px;
`;

/** Layout must have all LayoutProps values set,
 *  either as default value in props list or inhereted
 *  from parent component
 * */
export const LayoutWrapper: React.FC<LayoutProps> = (props) => {
    const { headerHeight = 64, menuLinkHeight = 72 } = props;

    const state: any = useContext(StateContext);

    return (
        <Wrapper>
            <HeaderWrapper>
                <Header />

                <Breadcrumbs
                    {...props}
                    items={{
                        cases: 'link',
                        actions: 'link',
                        planId: 'link',
                        caseId: 'link',
                        actionId: 'link',
                    }}
                />

                {/* <Actions /> */}
            </HeaderWrapper>
            <Container {...props} state={state}>
                <Content {...props} headerHeight={headerHeight} menuLinkHeight={menuLinkHeight} />
            </Container>
        </Wrapper>
    );
};
