import { FC } from '../../types';
import React from 'react';
import { defaultQueryReducer } from './defaultQueryReducer';

export type DefaultQueryProps = {
    state: any;
    dispatch: any;
}

const DefaultQuery: FC = () => {
    return (<React.Fragment>DefaultQuery</React.Fragment>)
}

// DefaultQuery.reducer = { defaultQueryReducer }

export { DefaultQuery }