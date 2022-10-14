import React from 'react';
import { FC } from 'types';
import { oDataQueryReducer } from './oDataQueryReducer';

export type ODataQueryProps = {
    state: any;
    dispatch: any;
};

/**
 * ODataQuery
 *
 * @returns
 */
const ODataQuery: FC = () => {
    return <>ODataQuery</>;
};

ODataQuery.reducer = { oDataQueryReducer };

export { ODataQuery };
