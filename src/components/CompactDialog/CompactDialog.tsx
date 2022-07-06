import { Scrim } from '@equinor/eds-core-react';
import React, { forwardRef, ReactNode, useCallback, useImperativeHandle, useState } from 'react';
import CompactDialogCard from './CompactDialogCard';

export interface CompactDialogProps {
    children?: React.ReactNode | null;
    /**
     * Sets the dialog title
     */
    title?: string;
    /**
     * Sets the dialog title icon
     */
    titleLeftIcon?: ReactNode;
    /**
     * Utilized to run extra callbacks on dialog-close
     */
    onDialogClose?: any;
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
    const { title, titleLeftIcon, onDialogClose, hideOnClose, children } = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isCloseDisabled, setIsCloseDisabled] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        open: () => {
            setIsOpen(true);
        },
        close: () => {
            setIsOpen(false);
            if (onDialogClose) onDialogClose();
        },
        activateOnClose: () => {
            setIsCloseDisabled(true);
        },
        disableOnClose: () => {
            setIsCloseDisabled(true);
        },
    }));

    const onClose = useCallback(() => {
        setIsOpen(false);
        if (onDialogClose) onDialogClose();
    }, [onDialogClose]);

    return (
        <Scrim open={isOpen} onClose={() => setIsOpen(false)}>
            <CompactDialogCard
                title={title}
                titleLeftIcon={titleLeftIcon}
                onClose={onClose}
                disableOnClose={isCloseDisabled}
                hideOnClose={hideOnClose}
            >
                {children}
            </CompactDialogCard>
        </Scrim>
    );
});
