import React, { MouseEventHandler } from 'react';
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
export declare const Filter: React.FC<FilterProps>;
