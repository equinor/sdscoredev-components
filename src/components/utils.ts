export const combineReducers = (...reducers: any) => {
    return (state: any, action: any) => {
        for (const reducer of reducers) {
            const result = reducer(state, action)
            if (result) return result
        }
    }
}

export const useCombinedReducers = (combinedReducers: any) => {
    const state = Object.keys(combinedReducers).reduce(
      (acc: any, key: any) => ({ ...acc, [key]: combinedReducers[key][0] }),
      {},
    );

    const dispatch = (action: any) =>
      Object.keys(combinedReducers)
        .map(key => combinedReducers[key][1])
        .forEach(fn => fn(action));

    return [state, dispatch];
  };

export const onNextFrame = (callback: FrameRequestCallback) => {
    setTimeout(function () {
        requestAnimationFrame(callback)
    })
}

export const resolve = (object: any, path: string | undefined, defaultValue: any = {}) =>
    path?.split('.').reduce((o: { [x: string]: any }, p: string | number) => (o ? o[p] : defaultValue), object);
  
