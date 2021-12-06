import { Store } from "keyv";
import { CacheDataModel } from "../models/cache.data";
import { getDataFromStorage } from "./get-data";
import { isPromise } from "./is-promise";

/**
 * 从缓存中获取cacheIn字段
 * @param {String}    key         缓存的key
 * @param {Storage}   storage     缓存的Storage
 */
export const getCacheInWithKey = (
    key: string,
    cache?: Store<any>
): Promise<number> | number => {
    const dataInCache = getDataFromStorage(key, cache);

    if (!dataInCache) {
        return 0;
    }

    if (isPromise(dataInCache)) {
        return (dataInCache as Promise<CacheDataModel>).then((d) => {
            return d ? d.cacheIn : 0;
        });
    }

    return dataInCache ? (dataInCache as CacheDataModel).cacheIn : 0;
};
