import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Tooltip as EdsTooltip, Icon } from '@equinor/eds-core-react';
import { help_outline } from '@equinor/eds-icons';

Icon.add({ help_outline });

const StyledEdsTooltip = styled(EdsTooltip)<any>`
    &:hover {
        cursor: help;
    }

    max-width: ${(props) => props.maxWidth ?? 300}px;
    white-space: normal;
`;

const StyledIcon = styled(Icon)`
    fill: #6f6f6f;
    width: 16px;
    height: 16px;
    top: -3px;
    position: relative;

    &:hover {
        cursor: help;
    }
`;

interface EdsTooltipProps {
    className?: string;
    title?: string;
    open?: boolean;
    children?: Array<ReactElement> | ReactElement;
    placement: string;
    optional?: boolean;
    maxWidth?: number;
}

interface TooltipProps {
    disabled?: boolean;
}

const Tooltip: React.FC<EdsTooltipProps & TooltipProps> = (props) => {
    const { className, title, open, children, disabled, placement, maxWidth } = props;

    return (
        <>
            {!disabled ? (
                <StyledEdsTooltip
                    className={className}
                    title={title}
                    open={open}
                    placement={placement}
                    maxWidth={maxWidth}
                >
                    {children || (
                        <StyledIcon
                            name="help_outline"
                            size={16}
                            color="#007079"
                        />
                    )}
                </StyledEdsTooltip>
            ) : (
                <>{children}</>
            )}
        </>
    );
};

export default Tooltip;
