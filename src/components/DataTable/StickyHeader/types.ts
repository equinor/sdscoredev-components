export type StickyHeaderProps = {
    threshold?: number;
}

export type InternalStickyHeaderProps = {
    count?: number;
}

export type StickyHeaderRef = {
    calculate: () => void;
  } | null;