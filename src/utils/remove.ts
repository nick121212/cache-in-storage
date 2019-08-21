import {CacheNStorage} from "../models/cache.storage";

/**
 * 根据Key清除缓存
 * @param   {String}  key      唯一键值
 * @param   {Storage} storage  缓存类
 * @returns {void}
 */
export const removeCacheFromKey = (key: string, storage: CacheNStorage): void => {
	if (storage) {
		storage.removeItem(key);
	}
};
/**
 * 根据正则来删除缓存
 * @param   {RegExp}  regexp   正则表达式
 * @param   {Storage} storage  缓存类
 * @returns {void}
 */
export const removeCacheFromRegexp = (regexp: RegExp, storage: CacheNStorage): void => {
	storage.forEach((key: string) => {
		regexp.lastIndex = 0;

		if (!regexp.test(key)) {
			return;
		}

		storage.removeItem(key);
	});
};
