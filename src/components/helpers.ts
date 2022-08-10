export const combineReducers = (...reducers: any) => {
    return (state: any, action: any) => {
        for (const reducer of reducers) {
            const result = reducer(state, action);
            if (result) return result;
        }
    };
};

export const onNextFrame = (callback: FrameRequestCallback) => {
    setTimeout(function () {
        requestAnimationFrame(callback);
    });
};

export const resolve = (object: any, path: string | undefined, defaultValue: any = {}) =>
    path?.split('.').reduce((o: { [x: string]: any }, p: string | number) => (o ? o[p] : defaultValue), object);

/**
 * Provides an item found recursively in an array with a pathstring looking like "0.param.4.name"
 *
 * @param {any} obj Input object
 * @param {string} path The path to find
 * @return {object}
 */
export const getByPath = (obj: any, path: string) => {
    const pathArray = path.split('.');
    for (let i = 0, n = pathArray.length; i < n; ++i) {
        const k = pathArray[i];
        if (k in obj) {
            obj = obj[k];
        } else {
            return;
        }
    }
    return obj;
};

export const makeId = () => {
    let id = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (var i = 0; i < 6; i++) {
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
    obj = typeof obj === 'object' ? obj : {};
    const keys = Array.isArray(path) ? path : path.split('.');
    let curStep: any = obj;
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
