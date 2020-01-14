import { CacheOptionModel } from "../models/cache.option";
import { CacheNStorage } from "../models/cache.storage";
export declare const cacheDec: (func: (...args: any[]) => Promise<any>, key: string, settings: CacheOptionModel, storage?: CacheNStorage | undefined, promiseStorage?: CacheNStorage) => (...args: any[]) => Promise<any>;
