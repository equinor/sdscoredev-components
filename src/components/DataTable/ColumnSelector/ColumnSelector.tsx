import React, { useContext, useRef } from 'react';
import { Button, Tooltip, Icon, Checkbox } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { Dialog, DialogRef } from '../../Dialog';
import { DispatchContext, StateContext } from '../DataTableStore';
import { ColumnSelectorProps } from './types';

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-template-rows: repeat(5, auto);
    grid-auto-flow: column;
    margin-top: 8px;
`;

export const ColumnSelector: React.FC<ColumnSelectorProps> = ({ title, icon }) => {
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);
    const dialogRef = useRef<DialogRef>(null);

    const handleChange = (column: JSX.Element): void => {
        const { id } = column.props;

        if (state.dataTableReducer.visibleColumns?.includes(id)) {
            dispatch({ type: 'SET_VISIBLE_COLUMNS', payload: state.dataTableReducer.visibleColumns.filter((x: any) => x !== id) })
        } else {
            dispatch({ type: 'SET_VISIBLE_COLUMNS', payload: [...state.dataTableReducer.visibleColumns, id] })
        }
    }

    const handleResetColumns = (): void => {
        dispatch({ type: 'RESET_VISIBLE_COLUMNS' })
    }

    return (
        <>
            <Tooltip title="Manage columns" placement="top">
                <Button variant="ghost" onClick={() => dialogRef?.current?.open()} data-cy="manage-columns">
                {title}{icon}
                </Button>
            </Tooltip>
            
            <Dialog 
                title="Manage columns"
                width={1200}
                primaryButton="Reset"
                cancelButton="Close"
                noLoading={true}
                onPrimary={handleResetColumns}
                ref={dialogRef}
            >
                <ContentWrapper>
                    {state.dataTableReducer.columns.map((column: any) => (
                            <Checkbox
                                key={column.props.id}
                                label={column.props.children}
                                checked={state.dataTableReducer.visibleColumns?.includes(column.props.id)}
                                onChange={() => handleChange(column)}
                            />
                        )
                    )}
                </ContentWrapper>
            </Dialog>

        </>
    )
}
