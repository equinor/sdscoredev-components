import { FC } from '../../types';
import { Ref } from 'react';
export declare type StickyHeaderRef = {
    /**
     * Callback for scroll event
     */
    handleScroll: () => void;
    /**
     * Callback for resize event
     */
    handleResize: () => void;
} | null;
export declare type StickyHeaderProps = {
    /**
     * The scroll position where the ehader should stick at
     */
    threshold?: number;
    /**
     * A ref to this element
     */
    ref: Ref<StickyHeaderRef>;
};
declare const StickyHeader: FC<StickyHeaderProps>;
export { StickyHeader };
