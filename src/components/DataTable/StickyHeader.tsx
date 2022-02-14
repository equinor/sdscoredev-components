import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import styled from 'styled-components';
import { Table } from '@equinor/eds-core-react';
import { DispatchContext, StateContext } from "./DataTableStore";
import HeaderCell from "./internal/HeaderCell";
import CheckboxHeaderCell from './internal/CheckboxHeaderCell';
import { StickyHeaderRef, StickyHeaderProps } from './StickyHeader/types';

const Head = styled(Table.Head)`
    position: relative;
    overflow: hidden;
    white-space: normal;
`;

const StickyTable = styled(Table)<{ stick: boolean }>`
    position: fixed;
    top: 64px;
    visibility: ${(props: any) => (props.stick ? 'visible' : 'hidden')};
    overflow: hidden;
    z-index: 9;
`

export const StickyHeader = forwardRef<StickyHeaderRef, StickyHeaderProps>((props: StickyHeaderProps, ref) => {
    const { threshold } = props;
    const [stick, setStick] = useState<boolean>(false);
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);
    const headerElement = document.getElementById('dataTable.headerRow');
    const bodyElement = document.getElementById('dataTable.body');
    const stickyHeaderElement = document.getElementById('dataTable.stickyHeaderRow');
    const mutationObserver = useRef<MutationObserver | null>(null);

    const left = useRef<number>();

    const handleClick = (orderBy: string) => {
        dispatch({ type: 'SORT', payload: orderBy });
    }

    /**
     * Calculates widths of the header columns
     * 
     * @returns void
     */
    // const calculateColumnWidth = (): void => {
    //     if (!headerElement) return

    //     const payload = {}
    //     Array.from(headerElement.children).forEach((child: any) => {
    //         if (state.columnSelectorReducer.visibleColumns.includes(child.id)) {
    //             payload[child.id] = child.getBoundingClientRect().width - 32 // TODO: Must not use hard coded value (padding)
    //         }
    //     })
    //     dispatch({ type: 'SET_WIDTH', payload });
    // }

    /**
     * Sets the table header sticky if table top offset has reached threshold
     * 
     * @returns void
     */
    const determineStickyState = (): void => {
        if (!headerElement || !threshold) return

        const boundingBox = headerElement?.getBoundingClientRect()
        boundingBox.top <= threshold ? setStick(true) : setStick(false)

        if (stickyHeaderElement && left.current) stickyHeaderElement.style.left = `${boundingBox.left - left.current}px`
    }

    /**
     * Initialize a mutation observer that listen for changes in rows.
     * If a column is removed or added, the observer fires a callback to
     * recalculate widths.
     * 
     * Waits for headerElement and bodyElement is present. Needs the body to be present for
     * the initial calculation to happen.
     */
    useEffect(() => {
        if (!headerElement || !bodyElement || mutationObserver.current) return

        // calculateColumnWidth()
        dispatch({ type: "CALCULATE_COLUMN_WIDTH", payload: state.columnSelectorReducer.visibleColumns })

        mutationObserver.current = new MutationObserver(function (e) {
            if (e[0].removedNodes) dispatch({ type: "CALCULATE_COLUMN_WIDTH", payload: state.columnSelectorReducer.visibleColumns })
        });

        mutationObserver.current.observe(headerElement, { childList: true });
    }) // No dependency here, because we want to run this until table has rendered header and body

    /**
     * Provide initial left position of Table
     */
    useEffect(() => {
        left.current = headerElement?.getBoundingClientRect().left
    }, [headerElement]);

    useImperativeHandle(ref, () => ({
        handleScroll: () => determineStickyState(),
        handleResize: () => {
            left.current = headerElement?.getBoundingClientRect().left
            dispatch({ type: "CALCULATE_COLUMN_WIDTH", payload: state.columnSelectorReducer.visibleColumns })
        },
    }));
    
    return (
        <StickyTable stick={stick}>
            <Head id="dataTable.stickyHeaderRow">
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
                                onClick={() => handleClick(column.props.orderBy)} 
                            />
                    ))}
                </Table.Row>
            </Head>
        </StickyTable>
    );
});
