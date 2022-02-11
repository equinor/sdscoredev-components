import React, { MouseEventHandler, useContext } from "react";
import { Checkbox, EdsProvider, Table } from '@equinor/eds-core-react';
import { DispatchContext, StateContext } from "../DataTableStore";
import styled from "styled-components";

type CheckboxCellProps = {
   item: any;
}

const Wrapper = styled.div`
    cursor: pointer;
`

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

export const CheckboxCell: React.FC<CheckboxCellProps> = ({ item }) => {
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);

    const select = () => {
        const index = state.checkboxReducer.selected?.findIndex((x: any) => x.id === item.id);
        const selected = [...state.checkboxReducer.selected];
        if (index > -1) {
            selected.splice(index, 1);
        } else {
            selected.push(item);
        }
        dispatch({ type: 'SET_SELECTED', payload: selected });
    };

    const isSelected = () => state.checkboxReducer.selected.findIndex((x: any) => x.id === item.id) !== -1;
    
    return (
        <Cell>
            <EdsProvider density="compact">
                <Wrapper onClick={select}>
                    <Checkbox
                        name="multiple"
                        checked={isSelected()}
                        readOnly
                    />
                </Wrapper>
            </EdsProvider>
        </Cell>
    );
}