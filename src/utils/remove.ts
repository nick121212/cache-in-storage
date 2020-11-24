import Keyv, { Store } from "keyv";

/**
 * 根据Key清除缓存
 * @param   {String}  key      唯一键值
 * @param   {Storage} storage  缓存类
 * @returns {void}
 */
export const removeCacheFromKey = (key: string, storage?: Keyv | Store<any>): Promise<boolean> | undefined | boolean => {
    return storage?.delete(key);
};
