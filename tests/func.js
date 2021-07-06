import QuickLRU from "quick-lru";
const lru = new QuickLRU({ maxSize: 1000 });

export const getTimeSpan = async (isError = false) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      if (isError) {
        return _reject(new Error("test"));
      }
      resolve(Date.now() + Math.random());
    }, 200);
  });
};


export const TestStorage = {
  async get(key) {
    return lru.get(key);
  },
  async set(key, value, _ttl) {
    lru.set(key, value);
  },
  async delete(key) {
    return lru.delete(key);
  },
  async clear() {
    lru.clear();
  }
}
