import { ReactElement } from 'react';
export declare type TooltipProps = {
    disabled?: boolean;
    className?: string;
    title?: string;
    open?: boolean;
    children?: Array<ReactElement> | ReactElement;
    placement: string;
    optional?: boolean;
    maxWidth?: number;
};
export declare const Tooltip: (props: TooltipProps) => JSX.Element;
