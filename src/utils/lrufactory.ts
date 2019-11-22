import { BaseFactory } from "./factory";
import { LinkedList } from "./linkedlist";

/**
 * A doubly linked list-based Least Recently Used (LRU) cache. Will keep most
 * recently used items while discarding least recently used items when its limit
 * is reached.
 *
 * Illustration of the design:
 *
 *       entry             entry             entry             entry
 *       ______            ______            ______            ______
 *      | head |.newer => |      |.newer => |      |.newer => | tail |
 *      |  A   |          |  B   |          |  C   |          |  D   |
 *      |______| <= older.|______| <= older.|______| <= older.|______|
 *
 *  removed  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  added
 */
export class LRUFactory extends BaseFactory {
    private linkList!: LinkedList<string>;

    constructor(public limit: number = Number.MAX_SAFE_INTEGER) {
        super();

        this.linkList = new LinkedList();
    }

    /**
     * 设置一个实例
     * @param {string} key    键值
     * @param {T}      value  值
     */
    public setItem(key: string, instance: any): void {
        super.setItem(key, instance);

        if (this.linkList.size >= this.limit) {
            this.removeItem(key);
            this.linkList.removeFirst();
        }

        this.linkList.moveToLast(key, true);
    }

    /**
     * 删除一个实例
     * @param {string} key 实例的key
     */
    public removeItem(key: string): void {
        super.removeItem(key);

        this.linkList.remove(key);
    }

    /**
     * 获取一个元素
     * @param {string} key 实例的key
     */
    public getItem(key: string): string | null {
        const item = super.getItem(key);

        this.linkList.moveToLast(key, true);

        return item;
    }
}
