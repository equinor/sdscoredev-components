import React, { useState, useImperativeHandle, forwardRef, MouseEventHandler } from 'react';
import { Button, Dialog as EdsDialog, Scrim, DotProgress } from '@equinor/eds-core-react';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, auto);
    grid-gap: 8px;
`;

const StyledEdsDialog = styled(EdsDialog)<{ width: number }>`
    width: 85vw;
    max-width: ${(props) => props.width ? `${props.width}px` : '600px'};
`

type DialogProps = {
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

export type DialogRef = {
    abort: () => void;
    open: () => void;
    close: () => void;
  } | null;

export const Dialog = forwardRef<DialogRef, DialogProps>((props: DialogProps, ref) => {
    const { 
        children,
        title,
        onCancel,
        onPrimary,
        onDanger,
        cancelButton,
        primaryButton,
        dangerButton,
        width,
        noLoading = false,
        style 
    } = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        abort: () => {
            setIsLoading(false)
        },

        open: () => {
            setIsOpen(true)
        },

        close: () => {
            setIsOpen(false)
            setIsLoading(false)
        },
     }));

    const handleCancel = () => {
        setIsOpen(false)
        setIsLoading(false)
        onCancel && onCancel()
    }

    const handlePrimary = (data: any) => {
        setIsLoading(true)
        onPrimary && onPrimary(data)
    }

    if (!isOpen) return <></>;

    return (
        <Scrim 
            onClose={handleCancel}
            isDismissable
            open
        >
            <StyledEdsDialog data-cy="dialog" width={width || 0}>
                <EdsDialog.Title>{title}</EdsDialog.Title>
                <EdsDialog.CustomContent style={style} scrollable={false}>
                    {children}
                </EdsDialog.CustomContent>
                <EdsDialog.Actions>
                    <ButtonWrapper>
                        {primaryButton && (
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={handlePrimary}
                                // disabled={loading || isInvalid()}
                                data-cy="dialog-close"
                            >
                                {!noLoading && isLoading ? <DotProgress /> : primaryButton}
                            </Button>
                        )}
                        {dangerButton && (
                            <Button
                                color="danger"
                                variant="contained"
                                onClick={onDanger}
                                data-cy="dialog-danger"
                            >
                                {dangerButton}
                            </Button>
                        )}
                        {cancelButton && (
                            <Button
                                variant="ghost"
                                onClick={handleCancel}
                                data-cy="dialog-cancel"
                            >
                                {cancelButton}
                            </Button>
                        )}
                    </ButtonWrapper>
                </EdsDialog.Actions>  
            </StyledEdsDialog>
        </Scrim>

    )
})
