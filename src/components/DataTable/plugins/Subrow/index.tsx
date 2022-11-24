import React, { FC } from 'react';
import { ReducerProp } from 'types';
import { subrowReducer } from './subrowReducer';

export type SubrowProps = {
    columnHeader: string | Element;
    columnRender: Function | Element;
    render?: JSX.Element | Function | [Function, { [key: string]: any }];

};

const Subrow: FC<SubrowProps> & ReducerProp = (props) => {
    return <React.Fragment {...props}>Subrow</React.Fragment>;
};

Subrow.reducer = { subrowReducer };

export { Subrow };
