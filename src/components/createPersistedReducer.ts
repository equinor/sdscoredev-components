/* eslint-disable no-undef */
import usePersistedReducer from 'hooks/usePersistedReducer';
import { useReducer } from 'react';

import createStorage from './createStorage';

const createPersistedReducer = (key: string, provider = globalThis.localStorage) => {
    if (provider) {
        const storage = createStorage(provider);
        return (reducer: any, initialState: any) => usePersistedReducer(reducer, initialState, key, storage);
    }
    return useReducer;
};

export default createPersistedReducer;
