import { Store } from "keyv";
import { CacheDataModel } from "../models/cache.data";
import { getDataFromStorage } from "./get-data";

/**
 * 从缓存中获取cacheIn字段
 * @param {String}    key         缓存的key
 * @param {Storage}   storage     缓存的Storage
 */
export const getCacheInWithKey = async (key: string, cache?: Store<any>): Promise<number> => {
    const dataInCache: CacheDataModel | null = cache ? await getDataFromStorage(key, cache) : null;

    if (!dataInCache) {
        return 0;
    }

    return dataInCache.cacheIn;
};
