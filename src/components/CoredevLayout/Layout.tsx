import React from 'react';
import { LayoutStore } from './LayoutStore';
import { LayoutWrapper } from './LayoutWrapper';
import { IRoute } from './types';

export type LayoutProps = {
    /**
     * Height of the header, default is `64`
     */
    headerHeight: number;
    /**
     * The height of the menu items, default is `72`
     */
    menuLinkHeight: number;
    /**
     * Contains an object with route definitions
     */
    routes: Array<IRoute>;
};

export const Layout: React.FC<LayoutProps> = (props) => (
    <LayoutStore>
        <LayoutWrapper {...props} />
    </LayoutStore>
);

export default Layout;
