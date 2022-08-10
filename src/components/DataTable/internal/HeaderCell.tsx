import React, { MouseEventHandler, useContext } from 'react';
import styled from 'styled-components';

import { CellProps, Icon, Table } from '@equinor/eds-core-react';

import { DispatchContext, StateContext } from '../DataTableStore';

type TableHeaderCellProps = {
    column: JSX.Element;
    id: string;
    width?: number;
};

const Wrapper = styled(Table.Cell)<{ width?: number; fit?: boolean } & CellProps>`
    border-top: unset;
    box-sizing: unset;

    min-width: ${(props: any) => (props.width ? `${props.width}px` : 'unset')};
    white-space: ${(props: any) => (props.fit ? 'nowrap' : 'normal')};

    /* background-image: linear-gradient(to bottom, rgba(247, 247, 247, 1), transparent 50%);
    background-position: right top, right bottom;
    background-repeat: repeat-y;
    background-size: 1px 8px; */
`;

const DefaultCell = styled(Wrapper)``;

const SortCell = styled(Wrapper)<{ isSorted: boolean }>`
    color: ${(props: any) => (props.isSorted ? 'rgba(0, 112, 121, 1)' : 'inherit')};
    background: ${(props: any) => (props.isSorted ? 'rgba(234, 234, 234, 1)' : 'rgba(247, 247, 247, 1)')};

    svg {
        visibility: ${({ isSorted }) => (isSorted ? 'visible' : 'hidden')};
    }
    &:hover {
        cursor: pointer;
        background: rgba(220, 220, 220, 1);
        svg {
            visibility: visible;
        }
    }
`;

const HeaderCell: React.FC<TableHeaderCellProps> = ({ column, id, width }) => {
    const { fit } = column.props;
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);

    const handleClick = () => {
        if (column.props.sort) {
            if (typeof column.props.sort === 'boolean') dispatch({ type: 'SORT', payload: column.props.id });
            else dispatch({ type: 'SORT', payload: column.props.sort });
        }
    };

    const isSorted: boolean = column.props.id === state.sortReducer.orderBy;

    if (state.sortReducer && column.props.sort) {
        return (
            <SortCell onClick={handleClick} id={id} className="dataTableTh" width={width} fit={fit} isSorted={isSorted}>
                {column.props.children}
                <Icon name={state.sortReducer.ascending ? 'arrow_up' : 'arrow_down'} />
            </SortCell>
        );
    } else {
        return (
            <DefaultCell id={id} className="dataTableTh" width={width} fit={fit}>
                {column.props.children}
            </DefaultCell>
        );
    }
};

export default HeaderCell;
