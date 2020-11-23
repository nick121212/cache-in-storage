import { Store } from "keyv";
import QuickLRU from "quick-lru";

const lru = new QuickLRU({ maxSize: 1000 });

export default {
    get(key: string) {
        return lru.get(key);
    },
    set(key: string, value: any, _ttl?: number): any {
        lru.set(key, value);

        return value;
    },
    delete(key: string): boolean {
        return lru.delete(key);
    },
    clear(): void {
        lru.clear();
    }
} as Store<any>;