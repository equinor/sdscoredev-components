import { ReactElement } from 'react';

export type IRoute = {
    /**
     * Path string
     */
    path: string;
    /**
     * Define a component
     */
    component?: any; // TODO: Should be React component type
    /**
     * A callback that render a component
     */
    render?: any;
    /**
     * Redirects to another route
     */
    redirect?: string;
    /**
     *
     */
    exact?: boolean;
};

export type IMenuItem = {
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
    childItems?: Array<IMenuItem>;
    /**
     * Custom styling
     */
    style?: any;
    /**
     * Custom tooltip, if set to false, disable tooltip for this item
     */
    tooltip?: boolean | string;
};

export type ViewProps = {
    path: string;
};

// TODO: add real definition
export type ILayout = any;
