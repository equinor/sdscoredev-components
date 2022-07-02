import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';

import { Button, Checkbox, Tooltip, Typography } from '@equinor/eds-core-react';

import { Dialog, DialogRef } from '../../../Dialog';
import { DispatchContext, StateContext } from '../../DataTableStore';
import { ColumnSelectorProps, ColumnSelectorRef } from './';


interface OptionsWrapperProps{
  columnsNumber?: number;
  rowsNumber?: number;
}
const OptionsWrapper = styled.div<OptionsWrapperProps>`
  display: grid;
  grid-template-columns: ${({columnsNumber}) =>  columnsNumber ? `repeat(${columnsNumber}, auto)` :"repeat(2, auto)"};
  grid-template-rows: ${({rowsNumber}) =>  rowsNumber ? `repeat(${rowsNumber}, auto)` :"repeat(5, auto)"};
  grid-auto-flow: row;
  margin-top: 8px;
`;

export type InternalColumnSelectorProps = {
  columns?: any;
  visibleColumns?: Array<string>;
  onChange?: Function;
} & ColumnSelectorProps;

export const ColumnSelector = forwardRef<
  ColumnSelectorRef,
  InternalColumnSelectorProps
>((props: InternalColumnSelectorProps, ref) => {
  const { title, icon, onChange, columnsNumber, rowsNumber } = props;
  const state: any = useContext(StateContext);
  const dispatch: any = useContext(DispatchContext);
  const dialogRef = useRef<DialogRef>(null);
  const init = useRef<boolean>(false);

  /**
   * Throw error if columnSelectorReducer is not added to the `reducers` prop of `<DataTable>`
   */
  // if (!state.columnSelectorReducer) {
  //     throw Error("No columnSelectorReducer was found. Add one in the <DataTable> reducers prop.")
  // }

  const handleChange = (column: JSX.Element | string): void => {
    const id = typeof column === "string" ? column : column.props.id;

    if (state.columnSelectorReducer.visibleColumns?.includes(id)) {
      dispatch({
        type: "SET_VISIBLE_COLUMNS",
        payload: state.columnSelectorReducer.visibleColumns.filter(
          (x: any) => x !== id
        ),
      });
    } else {
      dispatch({
        type: "SET_VISIBLE_COLUMNS",
        payload: [...state.columnSelectorReducer.visibleColumns, id],
      });
    }

    onChange && onChange();
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
      result = [
        ...new Set([...state.columnSelectorReducer.visibleColumns, column]),
      ];
    } else {
      result = state.columnSelectorReducer.visibleColumns.filter(
        (x: string) => x !== column
      );
    }

    dispatch({ type: "SET_VISIBLE_COLUMNS", payload: result });
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
      result = [
        ...new Set([...state.columnSelectorReducer.visibleColumns, ...columns]),
      ];
    } else {
      result = state.columnSelectorReducer.visibleColumns.filter(
        (x: string) => !columns.includes(x)
      );
    }

    dispatch({ type: "SET_VISIBLE_COLUMNS", payload: result });
  };

  const handleResetColumns = (): void => {
    dispatch({
      type: "RESET_VISIBLE_COLUMNS",
      payload: state.dataTableReducer.columns,
    });
  };

  useImperativeHandle(ref, () => ({ setColumn, setColumns }), [
    state.columnSelectorReducer.visibleColumns,
  ]);

  if (!state.dataTableReducer.columns.length) return <></>;

  return (
    <>
      <Tooltip title="Manage columns" placement="top">
        <Button variant="ghost" onClick={() => dialogRef?.current?.open()}>
          {title}
          {icon}
        </Button>
      </Tooltip>

      <Dialog
        title={title}
        width={800}
        primaryButton="Apply"
        cancelButton="Reset"
        headerCloseButton={true}
        noLoading={true}
        onPrimary={() => dialogRef.current?.close()}
        onCancel={handleResetColumns}
        ref={dialogRef}
      >
        <Typography variant="h6">Default columns</Typography>
        <OptionsWrapper columnsNumber={columnsNumber} rowsNumber={rowsNumber}>
          {state.dataTableReducer.columns
            .filter(
              (x: any) => !x.props.optional && !x.props.id.startsWith("__")
            )
            .map((column: any) => (
              <Checkbox
                key={column.props.id}
                label={column.props.children}
                checked={state.columnSelectorReducer.visibleColumns?.includes(
                  column.props.id
                )}
                onChange={() => handleChange(column)}
              />
            ))}
        </OptionsWrapper>
        <Typography variant="h6">Optional columns</Typography>
        <OptionsWrapper>
          {state.dataTableReducer.columns
            .filter(
              (x: any) => x.props.optional && !x.props.id.startsWith("__")
            )
            .map((column: any) => (
              <Checkbox
                key={column.props.id}
                label={column.props.children}
                checked={state.columnSelectorReducer.visibleColumns?.includes(
                  column.props.id
                )}
                onChange={() => handleChange(column)}
              />
            ))}
        </OptionsWrapper>
      </Dialog>
    </>
  );
});
