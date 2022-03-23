import { useReducer } from 'react';
declare const createPersistedReducer: (key: string, provider?: Storage) => ((reducer: any, initialState: any) => unknown[]) | typeof useReducer;
export default createPersistedReducer;
