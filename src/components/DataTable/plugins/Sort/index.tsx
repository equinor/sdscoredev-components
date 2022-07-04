import React from 'react';
import { ReducerProp } from 'types';
import { sortReducer } from './sortReducer';

export type SortProps = {};

const Sort: React.FC<SortProps> & ReducerProp = (props) => {
    return <React.Fragment {...props}></React.Fragment>;
};

Sort.reducer = { sortReducer };

export { Sort };
