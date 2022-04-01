import { FC } from '../../types';
import React from 'react';
import { subrowReducer } from './subrowReducer';

export type SubrowProps = {
    render: Function;
    columnHeader: string | JSX.Element;
    columnRender: Function | JSX.Element;
};

const Subrow: FC<SubrowProps> = (props) => {
    return (<React.Fragment {...props}>Subrow</React.Fragment>)
}

Subrow.reducer = { subrowReducer }

export { Subrow }
