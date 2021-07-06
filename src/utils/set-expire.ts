import Keyv from "keyv";
import { CacheDataModel } from "../models/cache.data";
import { getDataFromStorage } from "./get-data";

/**
 * 重新设置缓存中的失效时间
 * @param {String}    key         缓存的key
 * @param {Number}    expire      缓存过期时间
 * @param {Storage}   storage     缓存的Storage
 */
export const setExpire = async (key: string, expire: number, cache?: Keyv): Promise<boolean> => {
    const dataInCache: CacheDataModel | null = cache ? await getDataFromStorage(key, cache) : null;

    if (!dataInCache || !cache) {
        return false;
    }

    await cache?.set(key, JSON.stringify({ 
        ...dataInCache,
        expire
     }));

    return true;
};
