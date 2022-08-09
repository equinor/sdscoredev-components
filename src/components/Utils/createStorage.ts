const createStorage = (provider: any) => ({
    get(key: string, initialState: any) {
        const json = provider.getItem(key);
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
