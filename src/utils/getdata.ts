import {CacheDataModel} from "../models/cache.data";

/**
 * 从缓存中获取数据
 * @param {Storage} storage 缓存对象
 * @param {String}  key     Key值
 * @returns {null|}
 */
export const getDataFromStorage = (key: string, storage?: Storage): CacheDataModel | null => {
	if (!storage) {
		return null;
	}

	let dataFromStorage: any = storage.getItem(key);

	if (typeof dataFromStorage === "string") {
		try {
			dataFromStorage = JSON.parse(dataFromStorage);
		} catch (e) {
			storage.removeItem(key);
			return null;
		}
	}

	const {expire = 0, cacheIn = 0, data = null} = dataFromStorage || {};

	// console.log(expire, cacheIn, data, Date.now())

	if (expire && cacheIn && cacheIn + expire < Date.now()) {
		storage.removeItem(key);

		return null;
	}

	if (!data) {
		return null;
	}

	return dataFromStorage;
};
