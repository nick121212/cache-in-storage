import Keyv, { Store } from "keyv";
import { CacheDataModel } from "../models/cache.data";
import { isPromise } from "./is-promise";

const parseData = (
    key: string,
    dataFromStorage: any,
    cache: Keyv | Store<any>
) => {
    if (!dataFromStorage) {
        return null;
    }

    if (isPromise(dataFromStorage)) {
        return dataFromStorage;
    }

    if (typeof dataFromStorage === "object") {
    } else if (typeof dataFromStorage === "string") {
        try {
            dataFromStorage = JSON.parse(dataFromStorage);
        } catch (e) {
            cache.delete(key);
            return null;
        }
    } else {
        throw new Error("dataFromStorage is not a string filed.");
    }

    const { expire = 0, cacheIn = 0, data = null } = dataFromStorage || {};

    if (expire && cacheIn && cacheIn + expire < Date.now()) {
        cache.delete(key);

        return null;
    }

    if (!data) {
        return null;
    }

    return dataFromStorage;
};

/**
 * 从缓存中获取数据
 * @param {Storage} storage 缓存对象
 * @param {String}  key     Key值
 * @returns {null|}
 */
export const getDataFromStorage = (
    key: string,
    cache?: Keyv | Store<any>
): Promise<CacheDataModel | null> | CacheDataModel | null => {
    if (!cache) {
        return null;
    }
    const data = cache.get(key);

    if (isPromise(data)) {
        return data.then((d: any) => {
            return parseData(key, d, cache);
        });
    }

    return parseData(key, data, cache);
};
