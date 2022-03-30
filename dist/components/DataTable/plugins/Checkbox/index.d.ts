import { FC } from '../../types';
export declare type CheckboxProps = {
    /**
     * Callback that triggers when rows are selected. will provide an `Array<any>` of the selected `items` .
     */
    onChange: (items: Array<any>) => void;
};
declare const Checkbox: FC<CheckboxProps>;
export { Checkbox };
