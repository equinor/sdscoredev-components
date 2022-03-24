/// <reference types="react" />
import { InputProps, Error } from "./withInput";
declare type SelectFieldProps = {
    options?: Array<any>;
    isDisabled?: boolean;
    getOptionLabel?: Function;
};
declare const _default: (props: SelectFieldProps & Error & InputProps) => JSX.Element;
export default _default;
