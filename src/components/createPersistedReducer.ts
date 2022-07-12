/* eslint-disable no-undef */
import { useReducer } from 'react';

import usePersistedReducer from './usePersistedReducer';
import createStorage from './createStorage';

const createPersistedReducer = (key: string, provider = globalThis.localStorage) => {
    if (provider) {
        const storage = createStorage(provider);
        return (reducer: any, initialState: any) => usePersistedReducer(reducer, initialState, key, storage);
    }
    return useReducer;
};

export default createPersistedReducer;
