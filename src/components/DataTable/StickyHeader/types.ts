export type StickyHeaderProps = {
    threshold?: number;
}

export type InternalStickyHeaderProps = {
    count?: number;
}

export type StickyHeaderRef = {
    handleScroll: () => void;
    handleResize: () => void;
  } | null;