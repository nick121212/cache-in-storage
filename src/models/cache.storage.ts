/**
 * 本地缓存的模型
 *
 * @export
 * @interface CacheNStorage
 * @extends {Storage}
 */
export interface CacheNStorage extends Storage {
    /**
     * 实现缓存中所有键值的遍历
     * @param {(key: string, val: any) => void} fn 遍历的方法
     */
    forEach(fn: (key: string, val: any) => void): void;
}
