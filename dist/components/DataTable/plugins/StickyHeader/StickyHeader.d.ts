import React from "react";
import { StickyHeaderProps, StickyHeaderRef } from ".";
export declare type InternalStickyHeaderProps = {
    id: string;
} & StickyHeaderProps;
export declare const StickyHeader: React.ForwardRefExoticComponent<Pick<InternalStickyHeaderProps, "id" | "threshold"> & React.RefAttributes<StickyHeaderRef>>;
