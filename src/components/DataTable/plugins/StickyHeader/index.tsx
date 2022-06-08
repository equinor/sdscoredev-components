import { FC, ReducerProp } from '../../types';
import React, { Ref } from 'react';
import { stickyHeaderReducer } from './stickyHeaderReducer';

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

const StickyHeader: React.FC<StickyHeaderProps> & ReducerProp = (props) => {
    return (<React.Fragment {...props}>StickyHeader</React.Fragment>)
}

StickyHeader.reducer = { stickyHeaderReducer }

export { StickyHeader }