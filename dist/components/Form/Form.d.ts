import React from 'react';
export declare type FormProps = {
    children: any;
    onSubmit?: Function;
    onRender?: Function;
    onValidate?: Function;
    data?: any;
    reducers?: any;
};
export declare type FormRef = {} | null;
/**
 * Provides a container to add rows to. The rows will contain input components,
 * and this component make sure the rows are dynamically created as a grid.
 *
 * @param props
 * @returns
 */
export declare const Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<FormRef>>;
