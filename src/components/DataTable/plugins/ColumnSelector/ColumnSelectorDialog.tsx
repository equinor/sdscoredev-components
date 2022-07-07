import { Checkbox, Density, EdsProvider, Typography } from '@equinor/eds-core-react';
import React, { FC } from 'react';
import styled from 'styled-components';

const GroupsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
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
    density?: Density;
    columnsNumber?: number;
    rowsNumber?: number;
    visibleColumns?: any;
    onCheck: (column: JSX.Element | string) => void;

    columns: any;
}

const ColumnSelectorDialog: FC<Props> = ({ density, columnsNumber, rowsNumber, visibleColumns, columns, onCheck }) => {
    return (
        <>
            <GroupsWrapper>
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
                </EdsProvider>
            </GroupsWrapper>
        </>
    );
};

export default ColumnSelectorDialog;
