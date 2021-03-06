/* eslint-disable no-plusplus */
export const combineReducers = (...reducers: any) => {
    // eslint-disable-next-line consistent-return
    return (state: any, action: any) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const reducer of reducers) {
            const result = reducer(state, action);
            if (result) return result;
        }
    };
};

export const useCombinedReducers = (combinedReducers: any) => {
    const state = Object.keys(combinedReducers).reduce(
        (acc: any, key: any) => ({ ...acc, [key]: combinedReducers[key][0] }),
        {},
    );

    const dispatch = (action: any) =>
        Object.keys(combinedReducers)
            .map((key) => combinedReducers[key][1])
            .forEach((fn) => fn(action));

    return [state, dispatch];
};

// eslint-disable-next-line no-undef
export const onNextFrame = (callback: FrameRequestCallback) => {
    setTimeout(() => {
        requestAnimationFrame(callback);
    });
};

export const resolve = (object: any, path: string | undefined, defaultValue: any = {}) =>
    path?.split('.').reduce((o: { [x: string]: any }, p: string | number) => (o ? o[p] : defaultValue), object);

export const makeId = () => {
    let id = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 6; i++) {
        id += characters.charAt(Math.floor(Math.random() * 36));
    }
    return id;
};

/**
 * Set the value for the given object for the given path
 * where the path can be a nested key represented with dot notation
 *
 * @param {object} obj   The object on which to set the given value
 * @param {string} path  The dot notation path to the nested property where the value should be set
 * @param {mixed}  value The value that should be set
 * @return {mixed}
 *
 */
export const set = (obj: Record<string, string | number | object>, path: string, value: any) => {
    const usableObj = typeof obj === 'object' ? obj : {};
    const keys = Array.isArray(path) ? path : path.split('.');
    let curStep: any = usableObj;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];

        if (!curStep[key] && !Object.prototype.hasOwnProperty.call(curStep, key)) {
            const nextKey = keys[i + 1];
            const useArray = /^\+?(0|[1-9]\d*)$/.test(nextKey);
            curStep[key] = useArray ? [] : {};
        }

        curStep = curStep[key];
    }

    const finalStep = keys[keys.length - 1];
    curStep[finalStep] = value;
};

export const getDataProps = (props: any) => {
    const result = {};
    Object.keys(props).forEach((key: any, index: number) => {
        if (key.startsWith('data-')) result[key] = props[key];
    });

    return result;
};

export const camelize = (str: string) => {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};
