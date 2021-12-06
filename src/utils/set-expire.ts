import Keyv, { Store } from "keyv";
import { CacheDataModel } from "../models/cache.data";
import { getDataFromStorage } from "./get-data";
import { isPromise } from "./is-promise";

/**
 * 重新设置缓存中的失效时间
 * @param {String}    key         缓存的key
 * @param {Number}    expire      缓存过期时间
 * @param {Storage}   storage     缓存的Storage
 */
export const setExpire = (
    key: string,
    expire: number,
    cache?: Keyv | Store<any>
): Promise<boolean> | boolean => {
    const dataInCache = getDataFromStorage(key, cache);

    if (!dataInCache || !cache) {
        return false;
    }

    if (isPromise(dataInCache)) {
        return (dataInCache as Promise<CacheDataModel | null>).then((d) => {
            if (!d) {
                return false;
            }

            return cache?.set(
                key,
                JSON.stringify({
                    ...d,
                    expire,
                })
            );
        });
    }

    return cache?.set(
        key,
        JSON.stringify({
            ...dataInCache,
            expire,
        })
    );
};
