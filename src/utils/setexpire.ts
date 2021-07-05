import { CacheDataModel } from "../models/cache.data";
import { getDataFromStorage } from "./getdata";

/**
 * 重新设置缓存中的失效时间
 * @param {String}    key         缓存的key
 * @param {Number}    expire      缓存过期时间
 * @param {Storage}   storage     缓存的Storage
 */
export const setExpire = (
    key: string,
    expire: number,
    storage?: Storage
): boolean => {
    const dataInCache: CacheDataModel | null = storage
        ? getDataFromStorage(key, storage)
        : null;

    if (!dataInCache || !storage) {
        return false;
    }

    storage.setItem(key, JSON.stringify({ data: dataInCache.data, expire, cacheIn: dataInCache.cacheIn }));

    return true;
};
