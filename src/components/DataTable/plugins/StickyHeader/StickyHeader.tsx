import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import styled from 'styled-components';
import { Table } from '@equinor/eds-core-react';
import { DispatchContext, StateContext } from "../../DataTableStore";
import HeaderCell from "../../internal/HeaderCell";
import CheckboxHeaderCell from '../../internal/CheckboxHeaderCell';
import { StickyHeaderProps, StickyHeaderRef } from ".";
import { ColumnProps } from "components/DataTable/Column";

const Head = styled(Table.Head)`
    position: relative;
    overflow: hidden;
    white-space: normal;
`;

const StickyTable = styled(Table)<{ stick: boolean, threshold: number | undefined }>`
    position: fixed;
    top: ${(props: any) => (props.threshold > 0 ? `${props.threshold}px` : '0')};
    visibility: ${(props: any) => (props.stick ? 'visible' : 'hidden')};
    overflow: hidden;
    z-index: 9;
`

export type InternalStickyHeaderProps = {
    id: string;
} & StickyHeaderProps;

export const StickyHeader = forwardRef<StickyHeaderRef, InternalStickyHeaderProps>((props: InternalStickyHeaderProps, ref) => {
    const { threshold, id } = props;
    const [stick, setStick] = useState<boolean>(false);
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);
    const stickyHeaderElement = document.getElementById(`dataTable.stickyHeaderRow.${id}`);
    const headerElement = document.getElementById(`dataTable.headerRow.${id}`);
    const init = useRef<number>(0);
    const left = useRef<number>();

    const handleClick = (columnProps: ColumnProps) => {
        if (columnProps.sort) {
            typeof columnProps.sort === 'boolean' ? dispatch({ type: 'SORT', payload: columnProps.id }) : dispatch({ type: 'SORT', payload: columnProps.sort });
            // TODO: Deprecated, should be removed
        } else if (columnProps.orderBy) {
            dispatch({ type: 'SORT', payload: columnProps.orderBy });
        }
    }

    /**
     * Sets the table header sticky if table top offset has reached threshold
     * 
     * @returns void
     */
    const determineStickyState = (): void => {
        if (!headerElement || typeof threshold === 'undefined') return

        const boundingBox = headerElement?.getBoundingClientRect()
        boundingBox.top <= threshold ? setStick(true) : setStick(false)

        if (stickyHeaderElement && left.current) stickyHeaderElement.style.left = `${boundingBox.left - left.current}px`
    }

    /**
     * Try calculating column widths
     */
    useEffect(() => {
       if (state.columnSelectorReducer.visibleColumns && state.columnSelectorReducer.visibleColumns.length) {
            var calculated = setInterval(function() {
                if (true) {
                    dispatch({ type: "CALCULATE_COLUMN_WIDTH", payload: state.columnSelectorReducer.visibleColumns, id })
                    clearInterval(calculated);
                }
                init.current++
            }, 100);
        }

    }, [state.columnSelectorReducer.visibleColumns])

    useImperativeHandle(ref, () => ({
        handleScroll: () => determineStickyState(),
        handleResize: () => {
            dispatch({ type: "CALCULATE_COLUMN_WIDTH", payload: state.columnSelectorReducer.visibleColumns, id })
        },
    }));

    // Get left position of header element
    left.current = headerElement?.getBoundingClientRect().left
    
    if (!state.stickyHeaderReducer.width) return <></>

    return (
        <StickyTable stick={stick} threshold={threshold}>
            <Head id={`dataTable.stickyHeaderRow.${id}`}>
                <Table.Row>
                    {state.checkboxReducer && (
                        <CheckboxHeaderCell key="checkbox-header" />
                    )}

                    {state.dataTableReducer.columns?.filter((x: any) => state.columnSelectorReducer.visibleColumns?.includes(x.props.id)).map((column: JSX.Element) => (
                        <HeaderCell 
                            key={column.props.id} 
                            width={state.stickyHeaderReducer.width[column.props.id]} 
                            id={`sticky-${column.props.id}`} 
                            column={column} 
                            onClick={() => handleClick(column.props)} 
                        />
                    ))}
                </Table.Row>
            </Head>
        </StickyTable>
    );
});
