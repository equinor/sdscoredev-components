import { Ref } from "react";

export type StickyHeaderProps = {
    /**
     * The scroll position where the ehader should stick at
     */
    threshold?: number;
    /**
     * A ref to this element
     */
    ref: Ref<any>;
}

export type InternalStickyHeaderProps = {
    count?: number;
}

export type StickyHeaderRef = {
    handleScroll: () => void;
    handleResize: () => void;
  } | null;