import { Ref } from "react";

export type StickyHeaderProps = {
    threshold?: number;
    ref: Ref<any>;
    id: string;
}

export type InternalStickyHeaderProps = {
    count?: number;
}

export type StickyHeaderRef = {
    handleScroll: () => void;
    handleResize: () => void;
  } | null;