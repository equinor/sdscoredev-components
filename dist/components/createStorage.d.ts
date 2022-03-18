declare const createStorage: (provider: any) => {
    get(key: string, initialState: any): any;
    set(key: string, value: any): void;
};
export default createStorage;
