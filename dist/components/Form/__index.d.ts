import React from 'react';
interface IFormContext {
    data: any;
    width: number;
    setData?: Function;
    setWidth?: Function;
    handleSubmit?: React.MouseEventHandler<HTMLButtonElement>;
}
declare type FormProps<T> = {
    children: any;
    cancelEl?: any;
    submitEl?: any;
    onSubmit?: Function;
    defaultData: Object | null;
    onChange?: Function;
    width?: number;
};
export declare const FormContext: React.Context<IFormContext>;
declare const Form: <T extends Object>({ children, cancelEl, submitEl, onSubmit, onChange, defaultData, width, ...props }: FormProps<T>) => JSX.Element;
export default Form;
export { Row } from './Row';
