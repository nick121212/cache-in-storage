import Keyv, { Store } from "keyv";
import { CacheDataModel } from "../models/cache.data";

/**
 * 从缓存中获取数据
 * @param {Storage} storage 缓存对象
 * @param {String}  key     Key值
 * @returns {null|}
 */
export const getDataFromStorage = async (key: string, cache?: Keyv | Store<any>): Promise<CacheDataModel | null> => {
    if (!cache) {
        return null;
    }

    let dataFromStorage: any = await cache.get(key);

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
