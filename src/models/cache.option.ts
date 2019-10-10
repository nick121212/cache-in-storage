/**
 * 缓存的控制模型
 *
 * @export
 * @interface CacheOptionModel
 */
export interface CacheOptionModel {
	/**
	 * 是否需要缓存
	 *
	 * @type {boolean}
	 * @memberof CacheOptionModel
	 */
	cache?: boolean;
	/**
	 * 是否重新获取新的数据，不管缓存存不存在
	 *
	 * @type {boolean}
	 * @memberof CacheOptionModel
	 */
	reload?: boolean;
	/**
	 * 缓存的过期时长，单位毫秒
	 *
	 * @type {number}
	 * @memberof CacheOptionModel
	 */
	expire?: number;
	/**
	 * 废弃
	 *
	 * @type {boolean}
	 * @memberof CacheOptionModel
	 */
	local?: boolean;
}
