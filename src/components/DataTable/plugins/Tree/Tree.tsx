import React, { useContext, useEffect } from 'react';
import { TreeProps } from './index';
import { TreeCellRender } from './TreeCellRender';
import { DispatchContext } from '../../DataTableStore';

export type InternalTreeProps = {};

export const Tree: React.FC<InternalTreeProps & TreeProps> = ({ id, childrenProp }) => {
    const dispatch: any = useContext(DispatchContext);

    useEffect(() => {
        dispatch({ type: 'SET_PLUGIN_COLUMN_PROPS', payload: { [id]: { render: TreeCellRender } } });

        if (childrenProp) {
            dispatch({ type: 'SET_CHILDREN_PROP', payload: childrenProp });
        }
    }, []);

    return <></>;
};
