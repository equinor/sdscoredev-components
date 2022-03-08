import React, { MouseEventHandler } from 'react';
export declare type DialogProps = {
    children?: React.ReactNode | null;
    title?: string;
    onCancel?: Function;
    onPrimary?: Function;
    onDanger?: MouseEventHandler<HTMLButtonElement>;
    cancelButton?: string;
    primaryButton?: string;
    dangerButton?: string;
    width?: number;
    noLoading?: boolean;
    style?: any;
};
export declare type DialogRef = {
    abort: () => void;
    open: () => void;
    close: () => void;
} | null;
export declare const Dialog: React.ForwardRefExoticComponent<DialogProps & React.RefAttributes<DialogRef>>;
