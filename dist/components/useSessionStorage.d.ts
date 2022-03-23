declare const useSessionStorage: <T>(key: string, initialValue: T) => readonly [T, (value: T | ((val: T) => T)) => void];
export default useSessionStorage;
