import { Ref } from "react";
export declare type StickyHeaderProps = {
    threshold?: number;
    ref: Ref<any>;
    id: string;
};
export declare type InternalStickyHeaderProps = {
    count?: number;
};
export declare type StickyHeaderRef = {
    handleScroll: () => void;
    handleResize: () => void;
} | null;
