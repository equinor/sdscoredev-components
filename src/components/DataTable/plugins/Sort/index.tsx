import { FC, ReducerProp } from '../../types';
import React from 'react';
import { sortReducer } from './sortReducer';

export type SortProps = {};

const Sort: React.FC<SortProps> & ReducerProp = (props) => {
    return (<React.Fragment {...props}></React.Fragment>)
}

Sort.reducer = { sortReducer }

export { Sort };
