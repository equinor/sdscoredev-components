import { CustomRenderProps } from 'index';
import React, { useContext } from 'react';
import styled from 'styled-components';

import { Button as EdsButton, EdsProvider, Icon } from '@equinor/eds-core-react';

import { DispatchContext, StateContext } from '../../DataTableStore';

const Wrapper = styled.span<{ depth: number }>`
    display: grid;
    grid-template-columns: ${(props: any) => `${props.depth * 40}px 40px min-content`};
    height: 100%;
    align-content: center;
    margin-left: -8px; // TODO: should probably not be hard coded, rather make cells have no padding, and wrap content with a padding that can be dynamically changed
`;

const Button = styled(EdsButton)`
    z-index: 999;
`;

export const TreeCellRender = (props: CustomRenderProps) => {
    const { item, content, depth } = props;
    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);

    const handleClick = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch({ type: 'TREE_TOGGLE', payload: item?.id });
    };

    const isOpen = () => state.treeReducer.open.includes(item?.id);

    return (
        <EdsProvider density="compact">
            <Wrapper depth={depth || 0}>
                <div />

                {item && item[state.treeReducer.childrenProp] ? (
                    <Button variant="ghost_icon" onClick={handleClick}>
                        <Icon
                            name={isOpen() ? 'chevron_down' : 'chevron_right'}
                            size={24}
                            style={{ color: '#007079' }}
                        />
                    </Button>
                ) : (
                    <div />
                )}
                <span style={{ display: 'inline-block', alignSelf: 'center', paddingLeft: '4px' }}>{content}</span>
            </Wrapper>
        </EdsProvider>
    );
};
