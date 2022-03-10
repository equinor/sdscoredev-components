import React, { Ref } from 'react';

export type StickyHeaderRef = {
    /**
     * Callback for scroll event
     */
    handleScroll: () => void;
    /**
     * Callback for resize event
     */
    handleResize: () => void;
} | null;

export type StickyHeaderProps = {
    /**
     * The scroll position where the ehader should stick at
     */
     threshold?: number;
     /**
      * A ref to this element
      */
     ref: Ref<StickyHeaderRef>;
};


export const StickyHeader: React.FC<StickyHeaderProps> = (props) => {
    return (<React.Fragment {...props}>StickyHeader</React.Fragment>)
}