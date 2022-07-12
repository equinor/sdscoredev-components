import React, { FC } from 'react';

import { ReducerProp } from '../../types';
import { sortReducer } from './sortReducer';

export type SortProps = {};

const Sort: FC<SortProps> & ReducerProp = (props) => {
    return <React.Fragment {...props} />;
};

Sort.reducer = { sortReducer };

export { Sort };
