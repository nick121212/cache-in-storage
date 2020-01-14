import { getDataFromStorage } from "./getdata";
import { promiseFactory } from "./pfactory";
import { removeCacheFromKey } from "./remove";
export const cacheDec = (func, key, settings, storage, promiseStorage = promiseFactory) => {
    const { cache = false, reload = false, expire = 0 } = settings || {};
    function CacheFunc(...args) {
        if (reload || !cache) {
            removeCacheFromKey(key, promiseStorage);
            removeCacheFromKey(key, storage);
        }
        if (!cache) {
            return func.call(this, ...args);
        }
        let dataInCache = getDataFromStorage(key, promiseStorage);
        if (!dataInCache) {
            dataInCache = getDataFromStorage(key, storage);
        }
        if (dataInCache) {
            return Promise.resolve(dataInCache.data);
        }
        const promise = func.call(this, ...args);
        promiseStorage.setItem(key, { data: promise, expire, cacheIn: Date.now() });
        promise
            .then((d) => {
            if (storage) {
                storage.setItem(key, JSON.stringify({ data: d, expire, cacheIn: Date.now() }));
            }
        })
            .catch((e) => {
            removeCacheFromKey(key, promiseStorage);
            removeCacheFromKey(key, storage);
            throw e;
        });
        return promise;
    }
    return CacheFunc;
};
//# sourceMappingURL=cache.js.map