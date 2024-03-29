import React, { forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';

import { Table } from '@equinor/eds-core-react';

import { DispatchContext, StateContext } from '../../DataTableStore';
import HeaderCell from '../../internal/HeaderCell';
import CheckboxHeaderCell from '../Checkbox/CheckboxHeaderCell';
import { SubrowHeaderCell } from '../Subrow/SubrowHeaderCell';
import { StickyHeaderProps, StickyHeaderRef } from './index';

const Head = styled(Table.Head)`
    position: relative;
    overflow: hidden;
    white-space: normal;
`;

const StickyTable = styled(Table)<{ stick: boolean; threshold: number | undefined }>`
    position: fixed;
    top: ${(props: any) => (props.threshold > 0 ? `${props.threshold}px` : '0')};
    visibility: ${(props: any) => (props.stick ? 'visible' : 'hidden')};
    overflow: hidden;
    z-index: 9;
`;

export type InternalStickyHeaderProps = {
    id: string;
    plugins: any;
} & StickyHeaderProps;

export const StickyHeader = forwardRef<StickyHeaderRef, InternalStickyHeaderProps>(
    (props: InternalStickyHeaderProps, ref) => {
        const { threshold, id, plugins } = props;
        const [stick, setStick] = useState<boolean>(false);
        const state: any = useContext(StateContext);
        const dispatch: any = useContext(DispatchContext);
        const stickyHeaderElement = document.getElementById(`dataTable.stickyHeaderRow.${id}`);
        const headerElement = document.getElementById(`dataTable.headerRow.${id}`);
        const left = useRef<number>();

        const getVisibleColumns = useCallback((): Array<string> => {
            let payload: Array<string> = [];

            /** If we are using a columnSelector, we need to only calculate width of the visible Columns */
            if (
                state.columnSelectorReducer &&
                state.columnSelectorReducer.visibleColumns &&
                state.dataTableReducer.data
            ) {
                payload = state.columnSelectorReducer.visibleColumns;
            } else if (headerElement) {
                payload = Array.from(headerElement.children).map((x: any) => x.id);
            }

            /** In case column plugins exist, we need to add them to the payload */
            if (plugins.subrow && !payload.includes('__subrow')) payload.push('__subrow');
            if (plugins.checkbox && !payload.includes('__checkbox')) payload.push('__checkbox');

            return payload;
        }, [headerElement, state.columnSelectorReducer]);

        const calculateColumnWidths = () => {
            const payload = getVisibleColumns();
            dispatch({ type: 'CALCULATE_COLUMN_WIDTH', payload, id });
        };

        /**
         * Sets the table header sticky if table top offset has reached threshold
         * @returns void
         */
        const determineStickyState = (): void => {
            if (!headerElement || typeof threshold === 'undefined') return;

            const boundingBox = headerElement?.getBoundingClientRect();
            if (boundingBox.top <= threshold) setStick(true);
            else setStick(false);

            if (stickyHeaderElement && left.current)
                stickyHeaderElement.style.left = `${boundingBox.left - left.current}px`;
        };

        useEffect(() => {
            calculateColumnWidths();
        }, [state.columnSelectorReducer, state.dataTableReducer.data]);

        useImperativeHandle(ref, () => ({
            handleScroll: () => determineStickyState(),
            handleResize: () => calculateColumnWidths(),
        }));

        // Get left position of header element
        left.current = headerElement?.getBoundingClientRect().left;

        if (!state.stickyHeaderReducer.width) return <></>;

        return (
            <StickyTable stick={stick} threshold={threshold}>
                <Head id={`dataTable.stickyHeaderRow.${id}`}>
                    <Table.Row>
                        {/* ---- Checkbox plugin implementation start TODO: Do the same as with Subrow --------------------- */}
                        {state.checkboxReducer?.visible && <CheckboxHeaderCell key="checkbox-header" />}
                        {/* ---- Checkbox plugin implementation end ----------------------- */}

                        {state.dataTableReducer.columns
                            ?.filter((x: any) => getVisibleColumns().includes(x.props.id))
                            .map((column: JSX.Element) => (
                                <HeaderCell
                                    key={column.props.id}
                                    width={state.stickyHeaderReducer.width[column.props.id]}
                                    id={`sticky-${column.props.id}`}
                                    column={column}
                                />
                            ))}

                        {/* ---- Subrow plugin implementation start ---------------------------------------------------------------------------------- */}
                        {plugins.subrow && state.subrowReducer && (
                            <SubrowHeaderCell
                                key="subrow-header"
                                width={state.stickyHeaderReducer.width['__subrow']}
                                id="sticky-__subrow"
                            >
                                {plugins.subrow.props.columnHeader}
                            </SubrowHeaderCell>
                        )}
                        {/* ---- Subrow plugin implementation end ------------------------------------------------------------------------------------ */}
                    </Table.Row>
                </Head>
            </StickyTable>
        );
    },
);
