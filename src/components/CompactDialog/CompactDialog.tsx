import { Scrim } from '@equinor/eds-core-react';
import React, { forwardRef, ReactNode, useImperativeHandle, useState } from 'react';
import CompactDialogCard from './CompactDialogCard';

export interface CompactDialogProps {
    children?: React.ReactNode;
    /**
     * Sets the dialog title
     */
    title?: string;
    /**
     * Sets the dialog title icon
     */
    titleLeftIcon?: ReactNode;
    /**
     * If set to true, the close-button will not be visible
     */
    hideOnClose?: boolean;
}

export type CompactDialogRef = {
    /**
     * Opens the dialog
     */
    open: () => void;
    /**
     * Closes the dialog and calls `onDialogClose` if set
     */
    close: () => void;
    /**
     * Activates Close-Button if disabled
     */
    activateOnClose: () => void;
    /**
     * Disables Close-Button if enabled
     */
    disableOnClose: () => void;
} | null;

export const CompactDialog = forwardRef<CompactDialogRef, CompactDialogProps>((props, ref) => {
    const { title, titleLeftIcon, hideOnClose, children } = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isCloseDisabled, setIsCloseDisabled] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        open: () => {
            setIsOpen(true);
        },
        close: () => {
            setIsOpen(false);
        },
        activateOnClose: () => {
            setIsCloseDisabled(true);
        },
        disableOnClose: () => {
            setIsCloseDisabled(true);
        },
    }));

    return (
        <Scrim open={isOpen}>
            <CompactDialogCard
                title={title}
                titleLeftIcon={titleLeftIcon}
                onClose={() => setIsOpen(false)}
                disableOnClose={isCloseDisabled}
                hideOnClose={hideOnClose}
            >
                {children}
            </CompactDialogCard>
        </Scrim>
    );
});
