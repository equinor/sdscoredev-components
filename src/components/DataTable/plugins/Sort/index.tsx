import { FC } from '../../types';
import React from 'react';
import { sortReducer } from './sortReducer';

export type SortProps = {};

const Sort: FC<SortProps> = (props) => {
    return (<React.Fragment {...props}></React.Fragment>)
}

Sort.reducer = { sortReducer }

export { Sort };
