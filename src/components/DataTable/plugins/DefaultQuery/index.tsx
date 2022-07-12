import React from 'react';

import { FC } from '../../types';

export type DefaultQueryProps = {
    state: any;
    dispatch: any;
};

const DefaultQuery: FC = () => {
    return <>DefaultQuery</>;
};

// DefaultQuery.reducer = { defaultQueryReducer }

export { DefaultQuery };
