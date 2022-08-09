import styled from 'styled-components';

export const ActionBarWrapper = styled.g`
    cursor: pointer;
    outline: none;
`;

export const DateHandle = styled.rect<{ hidden: boolean }>`
    fill: #ddd;
    cursor: ew-resize;
    opacity: ${(props) => (!props.hidden ? 0 : 1)};
    visibility: ${(props) => (!props.hidden ? 'hidden' : 'visible')};
`;

export const ProgressHandle = styled.polygon<{ hidden: boolean }>`
    fill: #ddd;
    cursor: ew-resize;
    opacity: ${(props) => (!props.hidden ? 0 : 1)};
    visibility: ${(props) => (!props.hidden ? 'hidden' : 'visible')};
`;
