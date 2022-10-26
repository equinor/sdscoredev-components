import React, { FC, useMemo } from 'react';
import styled from 'styled-components';

import { Checkbox, Density, EdsProvider, Typography } from '@equinor/eds-core-react';

interface GroupsWrapperProps {
    maxHight?: string;
    maxWidth?: string;
    overflowY?: string;
    overflowX?: string;
}
const GroupsWrapper = styled.div<GroupsWrapperProps>`
    display: flex;
    flex-direction: column;
    gap: 1em;

    max-height: ${({ maxHight }) => maxHight && maxHight};
    max-width: ${({ maxWidth }) => maxWidth && maxWidth};
    overflow-y: ${({ overflowY }) => overflowY && overflowY};
    overflow-x: ${({ overflowX }) => overflowX && overflowX};
`;
interface OptionsWrapperProps {
    columnsNumber?: number;
    rowsNumber?: number;
}
const OptionsGroupWrapper = styled.div<OptionsWrapperProps>`
    display: grid;
    grid-template-columns: ${({ columnsNumber }) =>
        columnsNumber ? `repeat(${columnsNumber}, auto)` : 'repeat(2, auto)'};
    grid-template-rows: ${({ rowsNumber }) => (rowsNumber ? `repeat(${rowsNumber}, auto)` : 'repeat(5, auto)')};
    grid-auto-flow: row;
    margin-top: 0.3rem;
`;

const CheckBoxWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const CheckBoxLabel = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.2em;
    pointer-events: none;
    cursor: default;
`;

interface Props {
    columns: any;
    columnsNumber?: number;
    density?: Density;
    maxHight?: string;
    maxWidth?: string;
    overflowX?: string;
    overflowY?: string;
    rowsNumber?: number;
    visibleColumns?: any;
    onCheck: (column: JSX.Element | string) => void;
}

const ColumnSelectorDialog: FC<Props> = ({
    columns,
    columnsNumber,
    density,
    maxHight,
    maxWidth,
    overflowX,
    overflowY,
    rowsNumber,
    visibleColumns,
    onCheck,
}) => {
    const hasOptionalColumns = useMemo(() => {
        if (columns && Array.isArray(columns)) {
            return columns.some((x: any) => x.props.optional && !x.props.id.startsWith('__'));
        }
        return false;
    }, [columns]);

    return (
        <>
            <GroupsWrapper maxHight={maxHight} maxWidth={maxWidth} overflowX={overflowX} overflowY={overflowY}>
                <EdsProvider density={density}>
                    <span>
                        <Typography variant="h6">Default columns</Typography>
                        <OptionsGroupWrapper columnsNumber={columnsNumber} rowsNumber={rowsNumber}>
                            {columns
                                .filter((x: any) => !x.props.optional && !x.props.id.startsWith('__'))
                                .map((column: any) => (
                                    <CheckBoxWrapper key={column.props.id}>
                                        <Checkbox
                                            checked={visibleColumns?.includes(column.props.id)}
                                            onChange={() => onCheck(column)}
                                        />
                                        <CheckBoxLabel>{column.props.children}</CheckBoxLabel>
                                    </CheckBoxWrapper>
                                ))}
                        </OptionsGroupWrapper>
                    </span>
                    {hasOptionalColumns && (
                        <span>
                            <Typography variant="h6">Optional columns</Typography>
                            <OptionsGroupWrapper columnsNumber={columnsNumber} rowsNumber={rowsNumber}>
                                {columns
                                    .filter((x: any) => x.props.optional && !x.props.id.startsWith('__'))
                                    .map((column: any) => (
                                        <CheckBoxWrapper key={column.props.id}>
                                            <Checkbox
                                                checked={visibleColumns?.includes(column.props.id)}
                                                onChange={() => onCheck(column)}
                                            />
                                            <CheckBoxLabel>{column.props.children}</CheckBoxLabel>
                                        </CheckBoxWrapper>
                                    ))}
                            </OptionsGroupWrapper>
                        </span>
                    )}
                </EdsProvider>
            </GroupsWrapper>
        </>
    );
};

export default ColumnSelectorDialog;
