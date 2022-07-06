import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { Button, EdsProvider, Icon, Typography } from '@equinor/eds-core-react';

import { icons } from 'components/icons';

const ScrimOuterWrapper = styled.div`
    min-width: 20em;
    min-height: 10em;
    background: #ffffff;
    border-radius: 0.3rem;
    box-shadow: 0 3px 30px #383838;
`;
const ScrimTitleWrapper = styled.div`
    padding: 0.8rem 1rem 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const ScrimTitleLeftWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;
const ScrimContent = styled.div`
    padding: 1rem;
`;
const HorizontalDivider = styled.div`
    border-top: 0.1px solid #dfdfdf;
    margin: 0;
`;

interface Props {
    title?: string;
    titleLeftIcon?: ReactNode;
    onClose: () => void;
    disableOnClose?: boolean;
    hideOnClose?: boolean;
}

const CompactDialogCard: FC<Props> = ({ title, titleLeftIcon, onClose, disableOnClose, hideOnClose, children }) => (
    <ScrimOuterWrapper>
        <EdsProvider density="compact">
            <ScrimTitleWrapper>
                {(titleLeftIcon || title) && (
                    <ScrimTitleLeftWrapper>
                        {titleLeftIcon}
                        <Typography variant="h6">{title}</Typography>
                    </ScrimTitleLeftWrapper>
                )}
                {!hideOnClose && (
                    <Button variant="ghost_icon" onClick={onClose} disabled={disableOnClose}>
                        <Icon data={icons.close} />
                    </Button>
                )}
            </ScrimTitleWrapper>
        </EdsProvider>
        <HorizontalDivider />
        <ScrimContent>{children}</ScrimContent>
    </ScrimOuterWrapper>
);

export default CompactDialogCard;
