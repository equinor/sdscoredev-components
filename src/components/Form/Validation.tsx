import React from 'react';
import { ValidationProps } from './Validation/types';

/**
 * Validation plugin. Must be used together with `validationReducer`
 * 
 * @param props `<ValidationProps>`
 * @returns `JSX.Element`
 */
export const Validation: React.FC<ValidationProps> = (props) => {
    return (<React.Fragment {...props}></React.Fragment>)
}
