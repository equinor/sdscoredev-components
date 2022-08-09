import styled from 'styled-components';

export const TooltipDefaultContainer = styled.div`
    background: #fff;
    padding: 12px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export const TooltipDefaultContainerParagraph = styled.p`
    font-size: 12px;
    margin-bottom: 6px;
    color: #666;
`;

export const TooltipDetailsContainer = styled.div<{ hidden: boolean }>`
    position: absolute;
    display: flex;
    flex-shrink: 0;
    pointer-events: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    visibility: ${(props) => (props.hidden ? 'hidden' : 'visible')};
`;
