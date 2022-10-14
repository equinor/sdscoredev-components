import React, { FC } from 'react';
import { ReducerProp } from 'types';
import { subrowReducer } from './subrowReducer';

export type SubrowProps = {
    render: Function;
    columnHeader: string | Element;
    columnRender: Function | Element;
};

const Subrow: FC<SubrowProps> & ReducerProp = (props) => {
    return <React.Fragment {...props}>Subrow</React.Fragment>;
};

Subrow.reducer = { subrowReducer };

export { Subrow };
