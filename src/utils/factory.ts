import {CacheNStorage} from "../models/cache.storage";

/**
 * 实例的工厂类
 */
export class BaseFactory implements CacheNStorage {
	private instances: {[name: string]: any} = {};
	public length = 0;
	[name: string]: any;

    /**
     * 设置一个实例
     * @param {string} key    键值
     * @param {T}      value  值
     */
	public setItem(key: string, instance: any): void {
		this.instances[key] = instance;
		this.length++;
	}

    /**
     * 删除一个实例
     * @param {string} name 实例的key
     */
	public removeItem(name: string): void {
		if (this.instances.hasOwnProperty(name)) {
			this.length--;
		}

		Reflect.deleteProperty(this.instances, name);
	}

    /**
     * 获取一个元素
     * @param {string} name 实例的key
     */
	public getItem(name: string): string | null {
		if (this.instances.hasOwnProperty(name)) {
			return this.instances[name];
		}

		return null;
	}

    /**
     * 循环遍历数据
     * @param   {Function} fn  需要还行的方法
     * @return  {Void}
     */
	public forEach(fn: (key: string, val: any) => void): void {
		if (!fn || fn.constructor !== Function) {
			return;
		}

		for (const key in this.instances) {
			// if (!this.instances.hasOwnProperty(key)) {
			// 	continue;
			// }

			const element = this.instances[key];

			fn(key, element);
		}
	}

    /**
     * 清除掉所有的元素
     */
	public clear(): void {
		this.instances = {};
		this.length = 0;
	}

    /**
     * 返回一个KEY
     * @param {Number} index 索引
     */
	public key(index: number): string {
		return index.toString();
	}
}
