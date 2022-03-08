import React, { Ref } from 'react';
export declare type StickyHeaderProps = {
    /**
     * The scroll position where the ehader should stick at
     */
    threshold?: number;
    /**
     * A ref to this element
     */
    ref: Ref<any>;
};
export declare const StickyHeader: React.FC<StickyHeaderProps>;
