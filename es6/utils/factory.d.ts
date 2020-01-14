import { CacheNStorage } from "../models/cache.storage";
export declare class BaseFactory implements CacheNStorage {
    length: number;
    [key: string]: any;
    private instances;
    setItem(key: string, instance: any): void;
    removeItem(key: string): void;
    getItem(key: string): string | null;
    forEach(fn: (key: string, val: any) => void): void;
    clear(): void;
    key(index: number): string;
}
