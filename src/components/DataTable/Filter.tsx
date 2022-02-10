import React from 'react';
import { FilterProps } from './Filter/types';

/**
 * Filter plugin
 * 
 * @param props `<FilterProps>`
 * @returns `JSX.Element`
 */
export const Filter: React.FC<FilterProps> = (props) => {
    return (<React.Fragment {...props}></React.Fragment>)
}
