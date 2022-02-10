import React from 'react';
import { ColumnSelectorProps } from './ColumnSelector/types';

/**
 * Column selection plugin
 * 
 * @param props `<ColumnSelectorProps>`
 * @returns `JSX.Element`
 */
export const ColumnSelector: React.FC<ColumnSelectorProps> = (props) => {
    return (<React.Fragment {...props}></React.Fragment>)
}
