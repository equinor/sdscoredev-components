import { Table } from '@equinor/eds-core-react';
import React, { forwardRef, RefAttributes, useContext } from 'react';
import styled from 'styled-components';
import { StateContext } from '../DataTableStore';
import CheckboxCell from '../plugins/Checkbox/CheckboxCell';
import SubrowCell from '../plugins/Subrow/SubrowCell';
import { RowProps } from '../Row';
import Cell from './Cell';

const DefaultRow = styled(Table.Row)`
    display: table-row;
    vertical-align: middle;
    text-decoration: none;

    background-image: linear-gradient(to bottom, #cfcfcf, transparent 50%);
    background-position: left top, left bottom;
    background-repeat: repeat-y;
    background-size: 1px 8px;

    &:hover {
        cursor: pointer;
        background: rgba(247, 247, 247, 1);
    }
    & > td {
        border: none;
        border-bottom: 1px solid rgba(220, 220, 220, 1);
        border-top: 1px solid rgba(220, 220, 220, 1);
    }
`;

type TableRowProps = {
    data?: any;
    depth?: number;
    plugins?: any;
};

const Row: React.FC<TableRowProps & RowProps & RefAttributes<HTMLTableRowElement>> = forwardRef((props, ref) => {
    const { data, onClick, onHover, onHoverLeave, getLink, getStyle, plugins } = props;
    const state: any = useContext(StateContext);

    const handleClick = (e: any) => {
        e.preventDefault();

        if (getLink) {
            if (onClick) onClick(getLink(data));
        }

        if (onClick) onClick(data);
    };

    const handleHover = (e: any) => {
        e.preventDefault();

        if (onHover) onHover(data);
    };

    const handleHoverLeave = (e: any) => {
        e.preventDefault();

        if (onHoverLeave) onHoverLeave(data);
    };

    if (!data || !state.dataTableReducer.columns) return <></>;

    return (
        <DefaultRow role="row" ref={ref} style={getStyle && getStyle(data)}>
            {/* ---- Checkbox plugin implementation start --------------------------------------- */}
            {state.checkboxReducer?.visible && (
                <CheckboxCell key={`checkbox-header-${data.id}`} item={data} getKey={plugins.checkbox.props.getKey} />
            )}
            {/* ---- Checkbox plugin implementation end ----------------------------------------- */}

            {state.dataTableReducer.columns.map((column: any) => (
                <React.Fragment key={`${column.props.id}-${data.id}`}>
                    {state.columnSelectorReducer &&
                    state.columnSelectorReducer.visibleColumns?.includes(column.props.id) ? (
                        <Cell
                            {...props}
                            column={column}
                            onClick={handleClick}
                            onHover={handleHover}
                            onHoverLeave={handleHoverLeave}
                            item={data}
                            href={getLink ? getLink(data) : undefined}
                        />
                    ) : (
                        <></>
                    )}

                    {!state.columnSelectorReducer && !column.props.optional ? (
                        <Cell
                            {...props}
                            column={column}
                            onClick={handleClick}
                            onHover={handleHover}
                            onHoverLeave={handleHoverLeave}
                            item={data}
                            href={getLink ? getLink(data) : undefined}
                        />
                    ) : (
                        <></>
                    )}
                </React.Fragment>
            ))}

            {/* ---- Subrow plugin implementation start ---- */}
            {plugins.subrow && state.subrowReducer && (
                <SubrowCell item={data} render={plugins.subrow.props.columnRender} />
            )}
            {/* ---- Subrow plugin implementation end ------ */}
        </DefaultRow>
    );
});

export default Row;
