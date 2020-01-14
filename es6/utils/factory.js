export class BaseFactory {
    constructor() {
        this.length = 0;
        this.instances = {};
    }
    setItem(key, instance) {
        this.instances[key] = instance;
        this.length++;
    }
    removeItem(key) {
        if (this.instances.hasOwnProperty(key)) {
            this.length--;
        }
        Reflect.deleteProperty(this.instances, key);
    }
    getItem(key) {
        if (this.instances.hasOwnProperty(key)) {
            return this.instances[key];
        }
        return null;
    }
    forEach(fn) {
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
    clear() {
        this.instances = {};
        this.length = 0;
    }
    key(index) {
        return index.toString();
    }
}
//# sourceMappingURL=factory.js.map