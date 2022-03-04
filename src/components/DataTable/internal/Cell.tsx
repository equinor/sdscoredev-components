import React from "react";
import styled from 'styled-components';
import { CellProps, Table } from '@equinor/eds-core-react';
import { RowProps } from '../Row';
import { resolve } from '../../utils';

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

    & a {
        text-decoration: none;
        color: inherit;
    }

    & a::after {
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
                height: 50px;
                top: -18px;
                margin-top: 0;
                z-index: -1;
                width: 100%;
                background: rgba(234, 234, 234, 1);
                border-right: 1px dashed rgba(220, 220, 220, 1);
            }
        }
    }

    &:hover {
        & div.truncated-cell {
            overflow: visible;
            z-index: 66;

            span {
                background: rgba(234, 234, 234, 1);

                div {
                    display: block;
                }
            }
        }
    }
`;

type TableCellProps = {
    column?: any;
    onClick?: Function;
    item?: any;
    href?: string;
}

const Cell: React.FC<TableCellProps> = (props) => {
    const { column, onClick, item, href } = props;
    const { slim, id, render, truncate } = column.props;

    const RenderCell = () => {
        /* If render prop is an element */
        if (render && typeof render === 'function') {
            return render({ column, item, content: resolve(item, id, '') })
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

        /* Defautl render */
        return resolve(item, id, '')
    }

    return (
        <StyledCell 
            slim={slim}
            truncate={truncate}
            scope="col" 
            id={id}
            onClick={() => onClick && onClick}
        >
            {href ? <a href={href}>{RenderCell()}</a> : RenderCell()}
        </StyledCell>
    )
};

export default Cell;
