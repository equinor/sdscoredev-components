import React, { useState, useImperativeHandle, forwardRef, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Button, Dialog as EdsDialog, Divider, DotProgress, Icon } from '@equinor/eds-core-react';

const ButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 1rem 0;
`;

const HeaderWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 1rem 0;
`;

const StyledEdsDialog = styled(EdsDialog)<{ width: number }>`
    width: 85vw;
    margin-left: auto;
    margin-right: auto;
    max-width: ${(props) => (props.width ? `${props.width}px` : 'fit-content')};
`;

export type DialogProps = {
    children?: React.ReactNode | null;
    title?: string;
    onCancel?: Function;
    onPrimary?: Function;
    onDanger?: MouseEventHandler<HTMLButtonElement>;
    cancelButton?: string;
    primaryButton?: string;
    disablePrimary?: boolean;
    dangerButton?: string;
    width?: number;
    noLoading?: boolean;
    style?: any;
    headerCloseButton?: boolean;
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
        disablePrimary,
        dangerButton,
        width,
        noLoading = false,
        style,
        headerCloseButton,
    } = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        abort: () => {
            setIsLoading(false);
        },

        open: () => {
            setIsOpen(true);
        },

        close: () => {
            setIsOpen(false);
            setIsLoading(false);
        },
    }));

    const handleCancel = () => {
        setIsOpen(false);
        setIsLoading(false);
        if (onCancel) onCancel();
    };

    const handlePrimary = (data: any) => {
        setIsLoading(true);
        if (onPrimary) onPrimary(data);
    };

    if (!isOpen) return <></>;

    return (
        <StyledEdsDialog data-cy="dialog" width={width || 0} open={isOpen}>
            <EdsDialog.Header>
                <HeaderWrapper>
                    <EdsDialog.Title>{title}</EdsDialog.Title>
                    {headerCloseButton && (
                        <Button variant="ghost_icon" style={{ height: '0' }} onClick={() => setIsOpen(false)}>
                            <Icon name="close" title="close" />
                        </Button>
                    )}
                </HeaderWrapper>
            </EdsDialog.Header>
            <EdsDialog.CustomContent style={style} scrollable={false}>
                {children}
            </EdsDialog.CustomContent>
            <Divider />
            <EdsDialog.Actions style={{ width: '95%' }}>
                <Divider />
                <ButtonWrapper>
                    {primaryButton && (
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handlePrimary}
                            data-cy="dialog-close"
                            disabled={isLoading || disablePrimary}
                        >
                            {!noLoading && isLoading ? <DotProgress /> : primaryButton}
                        </Button>
                    )}
                    {dangerButton && (
                        <Button color="danger" variant="contained" onClick={onDanger} data-cy="dialog-danger">
                            {dangerButton}
                        </Button>
                    )}
                    {cancelButton && (
                        <Button variant="ghost" onClick={handleCancel} data-cy="dialog-cancel">
                            {cancelButton}
                        </Button>
                    )}
                </ButtonWrapper>
            </EdsDialog.Actions>
        </StyledEdsDialog>
    );
});
