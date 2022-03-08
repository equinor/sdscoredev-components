import React, { ReactElement } from 'react';
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
declare const Tooltip: React.FC<EdsTooltipProps & TooltipProps>;
export default Tooltip;
