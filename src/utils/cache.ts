import Keyv, { Store } from "keyv";
import { CacheOptionModel } from "../models/cache.option";
import { getDataFromStorage } from "./get-data";
import promiseCache from "../cache/promise-cache";
import { removeCacheFromKey } from "./remove";

/**
 * 对方法做缓存，方法必须返回Promise
 * 返回 {() => Promise<any>}
 * @param {String}               key                           缓存的唯一key
 * @param {Promise<any>}         func                          需要被高阶的函数
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
    key: string,
    func: (...args: any[]) => Promise<any>,
    settings: CacheOptionModel,
    storage?: Keyv,
    pCache: Store<any> = promiseCache
): ((...args: any[]) => Promise<any>) => {
    const { cache = false, reload = false, expire = 0 } = settings || {};

    const funcWithWrap = async (...args: any[]) => {
        const promise = func.call(this, ...args);

        // 添加缓存, 为了并发多次请求的情况下，故添加内存的promise缓存
        pCache.set(key, { data: promise, expire, cacheIn: Date.now() });

        await promise
            .then((d) => {
                return storage?.set(key, {
                    data: d,
                    expire,
                    cacheIn: Date.now(),
                });
            })
            .catch(async (e) => {
                removeCacheFromKey(key, pCache);
                await removeCacheFromKey(key, storage);

                throw e;
            });

        return promise;
    };

    async function CacheFunc(...args: any[]) {
        // 如果不缓存直接调用方法
        if (!cache) {
            return func.call(this, ...args);
        }

        let cacheInPromise;

        // 需要重新加载的情况
        if (reload) {
            cacheInPromise = async () => {
                removeCacheFromKey(key, pCache);

                await removeCacheFromKey(key, storage);

                return  await funcWithWrap(...args);
            };
        } else {
            cacheInPromise = async () => {
                let dataInCache = await getDataFromStorage(key, pCache);

                if (!dataInCache && storage) {
                    dataInCache = await getDataFromStorage(key, storage);
                }

                // 命中缓存
                if (dataInCache) {
                    return Promise.resolve(dataInCache.data);
                }

                return funcWithWrap(...args);
            };
        }

        const promise = cacheInPromise();

        pCache.set(key, {
            data: promise,
            expire,
            cacheIn: Date.now(),
        });

        return promise;
    }

    return CacheFunc;
};
