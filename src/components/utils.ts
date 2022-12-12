/* eslint-disable no-plusplus */

/**
 * combineReducers is a function that takes an arbitrary number of reducers as parameters and returns a single reducer.
 *
 * @param reducers: any - An arbitrary number of reducers
 * @returns (state: any, action: any) - A single reducer
 *
 * The function iterates over the reducers passed in as parameters and applies each one to the state and action provided.
 *
 */
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

/**
 * useCombinedReducers
 *
 * This function provides a hook to manage multiple reducers in one object.
 *
 * @param {any} combinedReducers - An object containing all the individual reducers
 *
 * @returns {any[]} - An array containing the state and dispatch objects
 *
 * The state object will contain the state of each individual reducer, stored in a key-value pair.
 *
 * The dispatch object will call the action function for each individual reducer.
 */
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

/**
 * resolve() is a function that takes in 3 parameters:
 *
 * @param {any} object
 *  The object that contains the value to be accessed.
 *
 * @param {string|undefined} path
 *  The path to the desired value. If starting with '__', it will be removed from the path.
 *
 * @param {any} defaultValue
 *  The default value if the desired value is not found.
 *
 * The function will return the value at the specified path in the object, or the default value if the path does not exist.
 */
export const resolve = (object: any, path: string | undefined, defaultValue: any = {}) => {
    if (path && path.startsWith('__')) {
        // eslint-disable-next-line no-param-reassign
        path = path.slice(2);
    }
    return path?.split('.').reduce((o: { [x: string]: any }, p: string | number) => (o ? o[p] : defaultValue), object);
};

/**
 * makeId
 *
 * This function is used to generate a random alphanumeric ID of length 6.
 *
 * @returns {string} - A random alphanumeric ID of length 6.
 */
export const makeId = (): string => {
    let id = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 6; i++) {
        id += characters.charAt(Math.floor(Math.random() * 36));
    }
    return id;
};

/**
 * set() is a function that sets a value of a property in a given object, or creates the property if it does not exist.
 *
 * @param {Record<string, string | number | object>} obj - The object to be used
 * @param {string} path - The path of the property to be set. Strings separated by a period (.) can be used to access nested properties.
 * @param {*} value - The value to be set
 *
 * @returns {void}
 */
export const set = (obj: Record<string, string | number | object>, path: string, value: any): void => {
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

/**
 * getDataProps() function takes in an object of props (props: any) and returns an object containing all props that start with 'data-'.
 *
 * @param {any} props - An object containing props
 *
 * @returns {object} - An object containing props that start with 'data-'
 */
export const getDataProps = (props: any): object => {
    const result = {};
    Object.keys(props).forEach((key: any, index: number) => {
        if (key.startsWith('data-')) result[key] = props[key];
    });

    return result;
};

/**
 * camelize()
 *
 * Function to convert a string to camelCase.
 *
 * @param {string} str - The string to be converted to camelCase.
 * @returns {string} - The string in camelCase format.
 */
export const camelize = (str: string) => {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};
