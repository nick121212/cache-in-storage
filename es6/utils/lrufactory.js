import { BaseFactory } from "./factory";
import { LinkedList } from "./linkedlist";
export class LRUFactory extends BaseFactory {
    constructor(limit = Number.MAX_SAFE_INTEGER) {
        super();
        this.limit = limit;
        this.linkList = new LinkedList();
    }
    setItem(key, instance) {
        super.setItem(key, instance);
        if (this.linkList.size >= this.limit) {
            this.removeItem(key);
            this.linkList.removeFirst();
        }
        this.linkList.moveToLast(key, true);
    }
    removeItem(key) {
        super.removeItem(key);
        this.linkList.remove(key);
    }
    getItem(key) {
        const item = super.getItem(key);
        this.linkList.moveToLast(key, true);
        return item;
    }
}
//# sourceMappingURL=lrufactory.js.map