import React from 'react';

type ToolbarProps = {}

/**
 * Toolbar plugin
 * 
 * @param props `<ToolbarProps>`
 * @returns `JSX.Element`
 */
export const Toolbar: React.FC<ToolbarProps> = (props) => {
    return (<React.Fragment {...props}>Toolbar</React.Fragment>)
}