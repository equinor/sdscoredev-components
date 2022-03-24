import React from 'react';
export interface InputProps {
    id: string;
    label?: string;
    meta?: string;
    value?: any;
    tooltip?: string;
    isRequired?: boolean;
    onChange?: any;
    edit?: boolean;
    disabled?: boolean;
}
export declare type Error = {
    error?: string;
};
export interface Options {
    debounceTime?: number;
}
export declare const withInput: ({ debounceTime }?: Options) => <TOriginalProps extends {}>(Component: React.ComponentClass<TOriginalProps & InputProps, any> | React.FunctionComponent<TOriginalProps & InputProps>) => (props: TOriginalProps & InputProps) => JSX.Element;
