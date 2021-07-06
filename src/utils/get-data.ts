import Keyv, { Store } from "keyv";
import { CacheDataModel } from "../models/cache.data";

const parseData = (
    key: string,
    dataFromStorage: any,
    cache: Keyv | Store<any>
) => {
    if (typeof dataFromStorage === "string") {
        try {
            dataFromStorage = JSON.parse(dataFromStorage);
        } catch (e) {
            cache.delete(key);
            return null;
        }
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
export const getDataFromStorage = async (
    key: string,
    cache?: Keyv | Store<any>
): Promise<CacheDataModel | null> => {
    if (!cache) {
        return null;
    }

    return parseData(key, await cache.get(key), cache);
};

/**
 * 从缓存中获取数据
 * @param {Storage} storage 缓存对象
 * @param {String}  key     Key值
 * @returns {null|}
 */
export const getDataFromStorageSync = (
    key: string,
    cache?: Keyv | Store<any>
): CacheDataModel | null => {
    if (!cache) {
        return null;
    }

    return parseData(key, cache.get(key), cache);
};
