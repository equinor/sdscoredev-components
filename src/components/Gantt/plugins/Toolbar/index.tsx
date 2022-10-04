import React, { Ref } from 'react';

export type ToolbarRef = {
    add: (item: any) => void;
} | null;

export type ToolbarProps = {
    placement?: 'top' | 'bottom';
    children?: any;
    id?: string;
    /**
     * A ref to this element
     */
    ref?: Ref<ToolbarRef>;
};

/**
 * Toolbar plugin
 *
 * @param props `<ToolbarProps>`
 * @returns `JSX.Element`
 */
export const Toolbar: React.FC<ToolbarProps> = (props) => {
    return <>Toolbar</>;
};
