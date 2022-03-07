import React, { Ref } from 'react';

export type StickyHeaderProps = {
    /**
     * The scroll position where the ehader should stick at
     */
     threshold?: number;
     /**
      * A ref to this element
      */
     ref: Ref<any>;
};

export const StickyHeader: React.FC<StickyHeaderProps> = (props) => {
    return (<React.Fragment {...props}>StickyHeader</React.Fragment>)
}