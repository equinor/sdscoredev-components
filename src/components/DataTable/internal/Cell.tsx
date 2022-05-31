import React from "react";
import styled from 'styled-components';
import { CellProps, Table } from '@equinor/eds-core-react';
import { resolve } from '../../utils';
import { Link } from "react-router-dom";

const StyledCell = styled(Table.Cell)<CellProps & { slim?: boolean, truncate?: number}>`
    border-top: unset !important;
    background-image: linear-gradient(to bottom, #cfcfcf, transparent 50%);
    background-position: right top, right bottom;
    background-repeat: repeat-y;
    background-size: 1px 8px;

    position: relative;

    width: ${(props: any) => (props.slim ? '1%' : 'unset')};
    max-width: ${(props: any) => (props.truncate ? `${props.truncate}px` : 'unset')};

    & div {
        margin-left: 0 !important;
    }

    & a.row-link {
        text-decoration: none;
        color: inherit;

        /* Moves all children of a anchor wrapped cell to fron so that they can receive mouse events */
        & > * {
            z-index: 9;
        }
    }

    & a.row-link::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
    }

    & div.truncated-cell {
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        z-index: 0;

        span {
            height: 100%;
            position: relative;
            background: none;
            padding-right: 16px;

            div {
                display: none;
                position: absolute;
                height: 48px;
                top: -17px;
                margin-top: 0;
                z-index: -1;
                width: 100%;
                background: rgba(247,247,247,1);
            }
        }
    }

    &:hover {
        & div.truncated-cell {
            overflow: visible;
            z-index: 66;

            span {
                background: rgba(247,247,247,1);

                div {
                    display: block;
                }
            }
        }
    }
`;

type TableCellProps = {
    column?: any;
    onClick?: Function; // Not in use
    item?: any;
    href?: string;
    depth?: number; // TODO: Try refactor out depth prop, it belongs to Tree plugin
}

const Cell: React.FC<TableCellProps> = (props) => {
    const { column, item, href, depth, onClick } = props;
    const { slim, fit, id, render, truncate } = column.props;

    const RenderCell = () => {
        /* If render prop is an element */
        if (render && typeof render === 'function') {
            return render({ column, item, content: resolve(item, id, ''), depth })
        }

        /* If render prop is an array */
        if (render && Array.isArray(render)) {
            return render[0]({
                ...props,
                content: resolve(item, id, ''),
                renderProps: render[1],
            })
        }

        if (!render && truncate) {
            return (
                <div className="truncated-cell">
                    <span>
                        {resolve(item, id, '')}
                        <div />
                    </span>
                </div>
            )
        }

        /* Default render */
        return resolve(item, id, '')
    }

    if (onClick && !href) {
        return (
            <StyledCell 
                slim={slim || fit}
                truncate={truncate}
                id={id}
                onClick={(e: any) => onClick(e)}
            >
                {RenderCell()}
            </StyledCell>
        )
    }

    return (
        <StyledCell 
            slim={slim || fit}
            truncate={truncate}
            id={id}
        >
            <Link className="row-link" to={{ pathname: href }}>{RenderCell()}</Link>
        </StyledCell>
    )
};

export default Cell;
