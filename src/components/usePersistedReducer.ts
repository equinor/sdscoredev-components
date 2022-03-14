import React, { useEffect } from 'react';

const usePersistedReducer = (reducer: any, initialState: any, key: string, storage: any) => {
    // console.log(key, storage.get(key, initialState))
  const [state, dispatch] = React.useReducer(reducer, storage.get(key, initialState));

  useEffect(() => {
    storage.set(key, state);
  }, [state]);

  return [state, dispatch];
};
export default usePersistedReducer;