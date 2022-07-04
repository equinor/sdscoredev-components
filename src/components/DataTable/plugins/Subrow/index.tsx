import React from 'react';
import { ReducerProp } from 'types';
import { subrowReducer } from './subrowReducer';

export type SubrowProps = {
    render: Function;
    columnHeader: string | JSX.Element;
    columnRender: Function | JSX.Element;
};

const Subrow: React.FC<SubrowProps> & ReducerProp = (props) => {
    return <React.Fragment {...props}>Subrow</React.Fragment>;
};

Subrow.reducer = { subrowReducer };

export { Subrow };
