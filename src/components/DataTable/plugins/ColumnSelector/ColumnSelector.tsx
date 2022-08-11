import { CompactDialog, CompactDialogRef } from 'components/CompactDialog';
import { Dialog, DialogRef } from 'components/Dialog';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';

import { Button, Tooltip } from '@equinor/eds-core-react';

import { DispatchContext, StateContext } from '../../DataTableStore';
import ColumnSelectorDialog from './ColumnSelectorDialog';
import { ColumnSelectorProps, ColumnSelectorRef } from './index';

export type InternalColumnSelectorProps = {
    columns?: any;
    visibleColumns?: Array<string>;
    onChange?: Function;
} & ColumnSelectorProps;

export const ColumnSelector = forwardRef<ColumnSelectorRef, InternalColumnSelectorProps>(
    (props: InternalColumnSelectorProps, ref) => {
        const { title, icon, onChange, dialogStyle, showApplyButton } = props;
        const { density } = dialogStyle || {};
        const state: any = useContext(StateContext);
        const dispatch: any = useContext(DispatchContext);

        // ? different refs for the dialogs
        const dialogRef = useRef<DialogRef>(null);
        const compactDialogRef = useRef<CompactDialogRef>(null);

        const init = useRef<boolean>(false);

        /**
         * Throw error if columnSelectorReducer is not added to the `reducers` prop of `<DataTable>`
         */
        // if (!state.columnSelectorReducer) {
        //     throw Error("No columnSelectorReducer was found. Add one in the <DataTable> reducers prop.")
        // }

        const handleChange = (column: JSX.Element | string): void => {
            const id = typeof column === 'string' ? column : column.props.id;

            if (state.columnSelectorReducer.visibleColumns?.includes(id)) {
                dispatch({
                    type: 'SET_VISIBLE_COLUMNS',
                    payload: state.columnSelectorReducer.visibleColumns.filter((x: any) => x !== id),
                });
            } else {
                dispatch({
                    type: 'SET_VISIBLE_COLUMNS',
                    payload: [...state.columnSelectorReducer.visibleColumns, id],
                });
            }

            if (onChange) onChange();
        };

        /**
         * Exposes a way to set a column visible / hidden through the component ref
         *
         * @param column
         * @param visible
         */
        const setColumn = (column: string, visible: boolean) => {
            if (!init.current || !state.columnSelectorReducer.visibleColumns) {
                init.current = true;
                return;
            }

            let result = [];

            if (visible) {
                result = [...new Set([...state.columnSelectorReducer.visibleColumns, column])];
            } else {
                result = state.columnSelectorReducer.visibleColumns.filter((x: string) => x !== column);
            }

            dispatch({ type: 'SET_VISIBLE_COLUMNS', payload: result });
        };

        /**
         * Exposes a way to set columns visible / hidden through the component ref
         *
         * @param columns
         * @param visible
         */
        const setColumns = (columns: Array<string>, visible: boolean) => {
            if (!init.current || !state.columnSelectorReducer.visibleColumns) {
                init.current = true;
                return;
            }

            let result = [];

            if (visible) {
                result = [...new Set([...state.columnSelectorReducer.visibleColumns, ...columns])];
            } else {
                result = state.columnSelectorReducer.visibleColumns.filter((x: string) => !columns.includes(x));
            }

            dispatch({ type: 'SET_VISIBLE_COLUMNS', payload: result });
        };

        const handleResetColumns = (): void => {
            dispatch({
                type: 'RESET_VISIBLE_COLUMNS',
                payload: state.dataTableReducer.columns,
            });
        };

        useImperativeHandle(ref, () => ({ setColumn, setColumns }), [state.columnSelectorReducer.visibleColumns]);

        if (!state.dataTableReducer.columns.length) return <></>;

        return (
            <>
                <Tooltip title="Manage columns" placement="top">
                    <Button
                        variant="ghost"
                        onClick={() => {
                            if (density === 'compact') compactDialogRef?.current?.open();
                            else dialogRef?.current?.open();
                        }}
                    >
                        {title}
                        {icon}
                    </Button>
                </Tooltip>

                {density === 'compact' ? (
                    <>
                        <CompactDialog ref={compactDialogRef} title={title}>
                            <ColumnSelectorDialog
                                columns={state.dataTableReducer.columns}
                                visibleColumns={state.columnSelectorReducer.visibleColumns}
                                onCheck={handleChange}
                                {...dialogStyle}
                            />
                            <CompactDialog.Actions>
                                {showApplyButton && (
                                    <Button onClick={() => compactDialogRef.current?.close()}>Apply</Button>
                                )}
                                <Button onClick={handleResetColumns} variant="ghost">
                                    Reset
                                </Button>
                            </CompactDialog.Actions>
                        </CompactDialog>
                    </>
                ) : (
                    <Dialog
                        ref={dialogRef}
                        title={title}
                        width={800}
                        headerCloseButton
                        noLoading
                        primaryButton={showApplyButton ? 'Apply' : ''}
                        onPrimary={showApplyButton ? () => dialogRef.current?.close() : undefined}
                        cancelButton="Reset"
                        onCancel={handleResetColumns}
                    >
                        <ColumnSelectorDialog
                            columns={state.dataTableReducer.columns}
                            visibleColumns={state.columnSelectorReducer.visibleColumns}
                            onCheck={handleChange}
                            {...dialogStyle}
                        />
                    </Dialog>
                )}
            </>
        );
    },
);
