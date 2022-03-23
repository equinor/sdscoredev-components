import { FC } from '../../types';
import React from 'react';
import { treeReducer } from './treeReducer';

export type TreeProps = {
    /**
     * The id of the column to add the tree arrow trigger
     */
    id: string;
};

const Tree: FC<TreeProps> = (props) => {
    return (<React.Fragment {...props}>Tree</React.Fragment>)
}

Tree.reducer = { treeReducer }

export { Tree }
