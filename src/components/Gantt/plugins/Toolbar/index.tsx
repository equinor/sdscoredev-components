import React, { RefObject } from 'react';

export type ToolbarProps = {
    placement?: 'right' | 'left' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    children?: any;
};

/**
 * Toolbar plugin
 *
 * @param props `<ToolbarProps>`
 * @returns `JSX.Element`
 */
export const Toolbar: React.FC<ToolbarProps> = (props) => {
    return <React.Fragment {...props}>Toolbar</React.Fragment>;
};
