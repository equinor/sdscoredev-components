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
`

export const StickyHeader = forwardRef<StickyHeaderRef, StickyHeaderProps>((props: StickyHeaderProps, ref) => {
    const { threshold } = props;
    const [stick, setStick] = useState<boolean>(false);
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);
    const headerElement = document.getElementById('dataTable.headerRow');
    const stickyHeaderElement = document.getElementById('dataTable.stickyHeaderRow');

    const left = useRef<number>();

    const handleClick = (orderBy: string) => {
        dispatch({ type: 'SORT', payload: orderBy });
    }

    /**
     * Provide initial left position of Table
     */
    useEffect(() => {
        left.current = headerElement?.getBoundingClientRect().left
    }, [headerElement]);

    useImperativeHandle(ref, () => ({
        calculate: () => {
            if (!headerElement || !threshold) return
            const boundingBox = headerElement?.getBoundingClientRect()

            boundingBox.top <= threshold ? setStick(true) : setStick(false)
            if (stickyHeaderElement && left.current) stickyHeaderElement.style.left = `${boundingBox.left - left.current}px`
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
                        <HeaderCell key={column.props.id} width={state.stickyHeaderReducer.width[column.props.id]} id={`sticky-${column.props.id}`} column={column} onClick={() => handleClick(column.props.orderBy)} />
                    ))}
                </Table.Row>
            </Head>
        </StickyTable>
    );
});
