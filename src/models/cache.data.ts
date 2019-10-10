/**
 * 缓存的数据模型
 *
 * @export
 * @interface CacheDataModel
 */
export interface CacheDataModel {
    /**
     * 过期时间，单位毫秒
     */
    expire: number;
    /**
     * 设置缓存的时间戳
     */
    cacheIn: number;
    /**
     * 缓存的数据
     */
    data: any;
}
