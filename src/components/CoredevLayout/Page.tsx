import React, { Children, ReactElement, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Typography } from '@equinor/eds-core-react';
import { useParams } from 'react-router-dom';
import { DispatchContext, StateContext } from './LayoutStore';

const Wrapper = styled.div<{ underConstruction: boolean }>`
    overflow-y: auto;
    display: grid;
    grid-template-rows: min-content auto;
    gap: 0;
    border: ${(props: any) => (props.underConstruction ? '2px solid red' : '0')};
`;

const WrapperWithSubTitle = styled.div<{ underConstruction: boolean }>`
    overflow-y: auto;
    border: ${(props: any) => (props.underConstruction ? '2px solid red' : '0')};
`;

const Header = styled.div<{ transparent: boolean }>`
    padding: 32px 0 0 0;
    align-items: center;
    background: ${(props: any) => (props.transparent ? 'transparent' : '#FFFFFF')};
    display: grid;
    grid-template-rows: auto 32px;
    gap: 0px 0px;
`;

const HeaderWithSubTitle = styled.div<{ transparent: boolean }>``;

const HeaderContainer = styled.div`
    display: grid;
    grid-template-columns: auto max-content;
    align-items: center;
`;

const HeaderContainerWithSubTitle = styled.div`
    display: flex;
    flex-direction: column;
`;

const HeaderInformation = styled.div`
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    letter-spacing: 1.1px;
`;
const HeaderWithSubTitleContent = styled.div`
    display: flex;
    align-items: center;
    align-content: flex-end;
    justify-content: space-between;
`;

const HeaderContent = styled.div`
    display: flex;
    flex-direction: row;
`;

const StyledTitle = styled(Typography)`
    margin: 1.5rem 0;
`;

const HeaderContentWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Content = styled.div<{ transparent: boolean }>`
    background: ${(props: any) => (props.transparent ? 'transparent' : '#FFFFFF')};
    padding: 0 32px 32px 32px;
`;

export type PageProps = {
    /**
     * Page title
     */
    title: string | ReactElement;
    /**
     * Page subtitle
     */
    subTitle?: string | ReactElement;
    /**
     * Sidesheet component
     */
    sideSheet?: any; // TODO: Change to defined type
    /**
     * Content in the header
     */
    headerContent?: any; // TODO: Change to defined type
    /**
     * Makes all page base color
     */
    transparent?: boolean;
    setSideSheetContent?: Function;
    onScroll?: Function;
    onResize?: Function;
    underConstruction?: boolean;
};

export const Page: React.FC<PageProps> = (props: any) => {
    const {
        children,
        title,
        subTitle,
        headerContent,
        transparent = false,
        path,
        onScroll,
        onResize,
        underConstruction,
    } = props;
    const dispatch: any = useContext(DispatchContext);
    const state: any = useContext(StateContext);
    const params = useParams();
    const ref = useRef<any>(null);

    const components = Children.toArray(children);

    useEffect(() => {
        dispatch({ type: 'SET_SIDE_SHEET', payload: undefined });
        dispatch({ type: 'SET_PARAMS', payload: params });
        dispatch({ type: 'SET_PATH', payload: path });
    }, []);

    useEffect((): any => {
        const handleResize = () => {
            if (typeof onResize === 'function') onResize(ref.current);
        };

        const handleScroll = () => {
            if (typeof onScroll === 'function') onScroll(ref.current);
        };

        window.addEventListener('resize', handleResize);
        ref.current.addEventListener('scroll', handleScroll);
        // return (): any => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (typeof onResize === 'function') onResize(ref.current);
    }, [state.menuOpen, state.sideSheet]);

    return subTitle ? (
        <WrapperWithSubTitle ref={ref} underConstruction={underConstruction}>
            <Content transparent={transparent}>
                <HeaderWithSubTitle transparent={transparent}>
                    <HeaderWithSubTitleContent>
                        <HeaderContainerWithSubTitle>
                            <StyledTitle variant="h2">{title}</StyledTitle>
                            {subTitle}
                        </HeaderContainerWithSubTitle>
                        <HeaderContent>{headerContent}</HeaderContent>
                    </HeaderWithSubTitleContent>
                    <HeaderInformation />
                </HeaderWithSubTitle>
                {components.map((component: any) => (
                    <component.type key={component.key} {...component.props} path={path} />
                ))}
            </Content>
        </WrapperWithSubTitle>
    ) : (
        <Wrapper ref={ref} underConstruction={underConstruction}>
            <Content transparent={transparent}>
                <Header transparent={transparent}>
                    <HeaderContainer>
                        <Typography variant="h2">{title}</Typography>
                        <HeaderContentWrapper>{headerContent}</HeaderContentWrapper>
                    </HeaderContainer>
                    <HeaderInformation />
                </Header>
                {components.map((component: any) => (
                    <component.type key={component.key} {...component.props} path={path} />
                ))}
            </Content>
        </Wrapper>
    );
};
