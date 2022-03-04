import { MouseEventHandler } from "react";

export type FilterProps = {
    title?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};