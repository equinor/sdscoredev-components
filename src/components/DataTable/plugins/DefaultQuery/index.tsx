import React from 'react';
import { FC } from 'types';

export type DefaultQueryProps = {
    state: any;
    dispatch: any;
};

const DefaultQuery: FC = () => {
    return <React.Fragment>DefaultQuery</React.Fragment>;
};

// DefaultQuery.reducer = { defaultQueryReducer }

export { DefaultQuery };
