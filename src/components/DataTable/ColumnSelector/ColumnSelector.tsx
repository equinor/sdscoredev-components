import React, { useContext, useRef } from 'react';
import { Button, Tooltip, Checkbox } from '@equinor/eds-core-react';
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

export const ColumnSelector: React.FC<ColumnSelectorProps> = ({ title, icon, cache, onChange }) => {
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);
    const dialogRef = useRef<DialogRef>(null);

    /**
     * Throw error if columnSelectorReducer is not added to the `reducers` prop of `<DataTable>`
     */
     if (!state.columnSelectorReducer) {
        throw Error("No columnSelectorReducer was found. Add one in the <DataTable> reducers prop.")
    }

    const handleChange = (column: JSX.Element): void => {
        const { id } = column.props;

        if (state.columnSelectorReducer.visibleColumns?.includes(id)) {
            dispatch({ type: 'SET_VISIBLE_COLUMNS', payload: state.columnSelectorReducer.visibleColumns.filter((x: any) => x !== id) })
        } else {
            dispatch({ type: 'SET_VISIBLE_COLUMNS', payload: [...state.columnSelectorReducer.visibleColumns, id] })
        }

        onChange && onChange()
    }

    const handleResetColumns = (): void => {
        dispatch({ type: 'RESET_VISIBLE_COLUMNS', payload: state.dataTableReducer.columns })
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
                                checked={state.columnSelectorReducer.visibleColumns?.includes(column.props.id)}
                                onChange={() => handleChange(column)}
                            />
                        )
                    )}
                </ContentWrapper>
            </Dialog>
        </>
    )
}
