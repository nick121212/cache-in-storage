import { CacheNStorage } from "../models/cache.storage";

/**
 * 实例的工厂类
 */
export class BaseFactory implements CacheNStorage {
    public length = 0;
    [key: string]: any;

    private instances: { [key: string]: any } = {};

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
     * @param {string} key 实例的key
     */
    public removeItem(key: string): void {
        if (this.instances.hasOwnProperty(key)) {
            this.length--;
        }

        Reflect.deleteProperty(this.instances, key);
    }

    /**
     * 获取一个元素
     * @param {string} key 实例的key
     */
    public getItem(key: string): string | null {
        if (this.instances.hasOwnProperty(key)) {
            return this.instances[key];
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
            if (this.instances.hasOwnProperty(key)) {
                const element = this.instances[key];

                fn(key, element);
            }
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
