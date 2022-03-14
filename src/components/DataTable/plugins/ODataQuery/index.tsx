import { FC } from '../../types';
import React from 'react';
import { oDataQueryReducer } from './oDataQueryReducer';

export type ODataQueryProps = {
    state: any;
    dispatch: any;
}

/**
 * ODataQuery
 * 
 * @returns 
 */
const ODataQuery: FC = () => {
    return (<React.Fragment>ODataQuery</React.Fragment>)
}

ODataQuery.reducer = { oDataQueryReducer }

export { ODataQuery }
