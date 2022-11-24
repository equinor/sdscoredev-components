import React, { useContext } from 'react';
import styled from 'styled-components';

import { Table } from '@equinor/eds-core-react';

import { DispatchContext } from '../../DataTableStore';
import { SubrowProps } from './index';

export type InternalSubrowProps = {
    data?: any;
};

const DefaultRow = styled(Table.Row)`
    & > td {
        border: none;
        border-bottom: 1px solid rgba(220, 220, 220, 1);

        &:first-child {
            border-left: 1px solid rgba(220, 220, 220, 1);
        }

        &:last-child {
            border-right: 1px solid rgba(220, 220, 220, 1);
        }
    }
`;

const StyledCell = styled(Table.Cell)`
    background: rgba(247, 247, 247, 1);
    padding-bottom: 16px;

    & div {
        margin-left: 0 !important;
    }
`;

export const Subrow: React.FC<InternalSubrowProps & SubrowProps> = (props) => {
    const { columnRender, render, data } = props;
    const dispatch: any = useContext(DispatchContext);

    const getCellCount = () => {
        const elements = document.getElementsByClassName('dataTableTh');
        return elements.length;
    };
    const RenderRow = () => {
        /* If render prop is an element */
        if (render && typeof render === 'function') {
            return render({ data });
        }

        /* If render prop is an array */
        if (render && Array.isArray(render)) {
            return render[0]({
                data,
                renderProps: render[1],
            });
        }
        return null;
     }

    return (
        <DefaultRow role="row">
            <StyledCell colSpan={getCellCount()}>{RenderRow()}</StyledCell>
        </DefaultRow>
    );
};
