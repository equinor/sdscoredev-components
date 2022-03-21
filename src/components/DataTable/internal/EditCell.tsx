import React, { useContext, useEffect } from "react";
import { EdsProvider, Icon, Table } from '@equinor/eds-core-react';
import { edit } from '@equinor/eds-icons' // import "save" icon
import { DispatchContext, StateContext } from "../DataTableStore";
import styled from "styled-components";

type EditCelllProps = {
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

const EditCell: React.FC<EditCelllProps> = ({ item }) => {
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);

    const editRow = () => {
        dispatch({ type: 'SET_EDIT_ROW', payload: !state.dataTableReducer.editRow })
    };
    
    return (
        <Cell>
            <EdsProvider density="compact">
                <Wrapper onClick={editRow}>
                    <Icon data={edit} onClick={editRow} color="#007079" />
                </Wrapper>
            </EdsProvider>
        </Cell>
    );
}

export default EditCell;