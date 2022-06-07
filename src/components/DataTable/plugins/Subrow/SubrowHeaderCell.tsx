import React from "react";
import { Table } from '@equinor/eds-core-react';
import styled from "styled-components";

type SubrowCellProps = {
   children?: any;
   id?: string;
   width?: number;
}

const Cell = styled(Table.Cell)<{ width?: number }>`
    border-top: unset !important;
    min-width: ${(props: any) => (props.width ? `${props.width}px`  : 'unset')};
    background-image: linear-gradient(to bottom, #cfcfcf, transparent 50%);
    background-position: right top, right bottom;
    background-repeat: repeat-y;
    background-size: 1px 8px;

    & div {
        margin-left: 0 !important;
    }
`;

export const SubrowHeaderCell: React.FC<SubrowCellProps> = ({ children, id, width }) => {
    return (
        <Cell className="dataTableTh" id={id} width={width}>
            {children}
        </Cell>
    );
}