/**
 * createStorage()
 *
 * Creates a storage object which can be used to store and retrieve data.
 *
 * @param {any} provider - The object used to store and retrieve data.
 * @returns {Object} An object with two methods, get() and set(), which can be used to store and retrieve data from the provider.
 */
const createStorage = (provider: any) => ({
    get(key: string, initialState: any) {
        const json = provider.getItem(key);
        // eslint-disable-next-line no-nested-ternary
        return json === null ? (typeof initialState === 'function' ? initialState() : initialState) : JSON.parse(json);
    },
    set(key: string, value: any) {
        try {
            provider.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.warn(err);
        }
    },
});

export default createStorage;
