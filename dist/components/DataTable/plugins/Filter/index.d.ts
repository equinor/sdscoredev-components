import { FC } from '../../types';
import { MouseEventHandler } from 'react';
export declare type FilterProps = {
    /**
     * The trigger button label
     */
    title?: string;
    /**
     * Callback for when click the trigger button
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;
};
declare const Filter: FC<FilterProps>;
export { Filter };
