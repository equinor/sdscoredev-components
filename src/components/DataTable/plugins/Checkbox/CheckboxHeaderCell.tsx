import React, { useContext } from 'react';
import styled from 'styled-components';

import { Checkbox, EdsProvider, Table } from '@equinor/eds-core-react';

import { DispatchContext, StateContext } from '../../DataTableStore';

type CheckboxCellProps = {};

const Wrapper = styled.div`
    cursor: pointer;
`;

const Cell = styled(Table.Cell)`
    border-top: unset !important;
    /* width: 1%; */
    padding: 0 8px;

    background-image: linear-gradient(to bottom, #cfcfcf, transparent 50%);
    background-position: right top, right bottom;
    background-repeat: repeat-y;
    background-size: 1px 8px;

    & div {
        margin-left: 0 !important;
    }
`;

const CheckboxHeaderCell: React.FC<CheckboxCellProps> = () => {
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);

    const selectAll = () => {
        if (state.checkboxReducer.selected.length === state.dataTableReducer.data.length) {
            dispatch({ type: 'SET_SELECTED', payload: [] });
        } else {
            dispatch({ type: 'SET_SELECTED', payload: state.dataTableReducer.data });
        }
    };

    return (
        <Cell id="__checkbox">
            <EdsProvider density="compact">
                <Wrapper onClick={selectAll}>
                    <Checkbox
                        name="multiple"
                        indeterminate={
                            state.checkboxReducer.selected.length > 0 &&
                            state.checkboxReducer.selected.length < state.dataTableReducer.data.length
                        }
                        checked={
                            state.checkboxReducer.selected.length > 0 &&
                            state.checkboxReducer.selected.length === state.dataTableReducer.data.length
                        }
                        readOnly
                        style={{ width: '1%' }}
                    />
                </Wrapper>
            </EdsProvider>
        </Cell>
    );
};

export default CheckboxHeaderCell;
