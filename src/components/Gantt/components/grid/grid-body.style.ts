import styled from 'styled-components';

export const GridRowLine = styled.line`
    stroke: #ebeff2;
`;

export const GridRow = styled.rect`
    fill: #fff;

    &:nth-child(even) {
        fill: #f5f5f5;
    }
`;

export const GridTick = styled.line`
    stroke: #ebeff2;
`;
