export interface CacheNStorage extends Storage {
    forEach(fn: (key: string, val: any) => void): void;
}
