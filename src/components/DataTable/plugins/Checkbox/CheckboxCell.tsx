import React, { useContext } from 'react';
import styled from 'styled-components';

import { Checkbox, EdsProvider, Table } from '@equinor/eds-core-react';

import { DispatchContext, StateContext } from '../../DataTableStore';

type CheckboxCellProps = {
    item: any;
    getKey?: string;
};

const Wrapper = styled.div`
    cursor: pointer;
`;

const Cell = styled(Table.Cell)`
    border-top: unset !important;
    width: 1%;
    padding: 0 8px;

    background-image: linear-gradient(to bottom, #cfcfcf, transparent 50%);
    background-position: right top, right bottom;
    background-repeat: repeat-y;
    background-size: 1px 8px;

    & div {
        margin-left: 0 !important;
    }
`;

const CheckboxCell: React.FC<CheckboxCellProps> = ({ item, getKey }) => {
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);

    const select = () => {
        const index = state.checkboxReducer.selected?.findIndex((x: any) => x[getKey || 'id'] === item[getKey || 'id']);
        const selected = [...state.checkboxReducer.selected];
        if (index > -1) {
            selected.splice(index, 1);
        } else {
            selected.push(item);
        }

        dispatch({ type: 'SET_SELECTED', payload: selected });
    };

    return (
        <Cell>
            <EdsProvider density="compact">
                <Wrapper onClick={select}>
                    <Checkbox
                        name="multiple"
                        checked={
                            state.checkboxReducer.selected.findIndex(
                                (x: any) => x[getKey || 'id'] === item[getKey || 'id'],
                            ) >= 0 || item?.isChecked
                        }
                        readOnly
                    />
                </Wrapper>
            </EdsProvider>
        </Cell>
    );
};

export default CheckboxCell;
