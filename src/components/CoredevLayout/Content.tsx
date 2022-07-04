import React, { useContext } from 'react';
import { SideSheet as EdsSideSheet } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { Menu } from './Menu';
import { LayoutProps } from './Layout';
import { DispatchContext, StateContext } from './LayoutStore';
// import ErrorBoundary from '../boundary/ErrorBoundary';

const SideSheet = styled(EdsSideSheet)`
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    width: 473px;
    padding: 0;

    & > div:first-child {
        padding: 16px;
    }
`;

const Content: React.FC<LayoutProps> = (props) => {
    const { routes } = props;

    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);

    return (
        <>
            {/* Prevent excessive rendering.
                This requires state.path to always be set, which means all <Page /> components must forward props like this:

                ```
                <Page {...props}> ... </Page>
                ```
            */}
            {state.path && <Menu {...props} />}
            {/* <ErrorBoundary> */}
            {/* --- Iterate Routes--------------------------------------------------------------------------------- */}
            <Routes>
                {routes.map((route: any) => (
                    <Route key={route.path} path={route.path} element={<>{route.component({ path: route.path })}</>} />
                ))}
            </Routes>
            {/* --------------------------------------------------------------------------------------------------- */}

            {state.sideSheet && (
                <SideSheet
                    onClose={() => dispatch({ type: 'SET_SIDE_SHEET', payload: undefined })}
                    open={state.sideSheet}
                >
                    {state.sideSheet}
                </SideSheet>
            )}
            {/* </ErrorBoundary> */}
        </>
    );
};

export default Content;
