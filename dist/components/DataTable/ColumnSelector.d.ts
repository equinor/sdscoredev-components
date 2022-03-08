import React, { Ref } from 'react';
export declare type ColumnSelectorProps = {
    /**
     * The trigger button label
     */
    title?: string;
    /**
     * The trigger button icon
     */
    icon?: JSX.Element;
    /**
     * A ref to this element
     */
    ref: Ref<any>;
};
export declare const ColumnSelector: React.FC<ColumnSelectorProps>;
