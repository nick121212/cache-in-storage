import {getDataFromStorage} from "./getdata";
import {CacheDataModel} from "../models/cache.data";

/**
 * 从缓存中获取cacheIn字段
 * @param {String}    key         缓存的key
 * @param {Storage}   storage     缓存的Storage
 */
export const getCacheInWithKey = (key: string, storage?: Storage): number => {
	const dataInCache: CacheDataModel | null = storage ? getDataFromStorage(key, storage) : null;

	if (!dataInCache) {
		return 0;
	}

	return dataInCache.cacheIn;
};
