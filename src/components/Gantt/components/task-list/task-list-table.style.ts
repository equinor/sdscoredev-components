import styled from 'styled-components';

export const TaskListWrapper = styled.div`
    display: table;
    border-bottom: #e6e4e4 1px solid;
    border-left: #e6e4e4 1px solid;
`;

export const TaskListTableRow = styled.div`
    display: table-row;
    text-overflow: ellipsis;
    &:nth-of-type(even) {
        background-color: #f5f5f5;
    }
`;
export const TaskListCell = styled.div`
    display: table-cell;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
export const TaskListNameWrapper = styled.div`
    display: flex;
`;

export const TaskListExpander = styled.div<{ empty: boolean }>`
    color: rgb(86 86 86);
    font-size: 0.6rem;
    padding-left: ${(props: { empty: any }) => (props.empty ? '1rem' : 'unset')};
    padding: ${(props: { empty: any }) => (props.empty ? 'unset' : '0.15rem 0.2rem 0rem 0.2rem')};
    user-select: none;
    cursor: pointer;
`;
