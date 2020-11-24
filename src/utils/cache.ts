import Keyv, { Store } from "keyv";
import { CacheOptionModel } from "../models/cache.option";
import { getDataFromStorage } from "./get-data";
import promiseCache from "../cache/promise-cache";
import { removeCacheFromKey } from "./remove";

/**
 * 对方法做缓存，方法必须返回Promise
 * 返回 {() => Promise<any>}
 * @param {Promise<any>}         func                          需要被高阶的函数
 * @param {String}               key                           缓存的唯一key
 * @param {CacheOptionModel}     settings                      缓存设置
 * @param {CacheNStorage}        storage                       缓存类
 * @param {CacheNStorage}        promiseStorage                promise缓存类
 * @example
 *  const cachePromise = cacheDec(()=>{
 *      return Promise.resolve(1);
 *  }, "test", { cache:true });
 *  cachePromise().then(console.log).cache(console.error)
 * @returns {Promise<any>}
 */
export const cacheDec = (
    func: (...args: any[]) => Promise<any>,
    key: string,
    settings: CacheOptionModel,
    storage?: Keyv,
    pCache: Store<any> = promiseCache
): ((...args: any[]) => Promise<any>) => {
    const { cache = false, reload = false, expire = 0 } = settings || {};

    async function CacheFunc(...args: any[]) {
        // 删除缓存
        if (reload || !cache) {
            removeCacheFromKey(key, pCache);
            removeCacheFromKey(key, storage);
        }

        // 如果不缓存直接调用方法
        if (!cache) {
            return func.call(this, ...args);
        }

        // 先从内存中获取数据，在从local中获取，如果没有再从内存中获取
        let dataInCache = await getDataFromStorage(key, pCache);
        if (!dataInCache) {
            dataInCache = await getDataFromStorage(key, storage);
        }

        // 命中缓存
        if (dataInCache) {
            return Promise.resolve(dataInCache.data);
        }

        // 如果错误的话，清除掉缓存
        const promise = func.call(this, ...args);

        // 添加缓存, 为了并发多次请求的情况下，故添加内存的promise缓存
        pCache.set(key, { data: promise, expire, cacheIn: Date.now() });

        promise
            .then((d) => {
                storage?.set(key, { data: d, expire, cacheIn: Date.now() });
            })
            .catch(async (e) => {
                await removeCacheFromKey(key, pCache);
                await removeCacheFromKey(key, storage);

                throw e;
            });

        return promise;
    }

    return CacheFunc;
};
