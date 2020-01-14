import { getDataFromStorage } from "./getdata";
export const getCacheInWithKey = (key, storage) => {
    const dataInCache = storage ? getDataFromStorage(key, storage) : null;
    if (!dataInCache) {
        return 0;
    }
    return dataInCache.cacheIn;
};
//# sourceMappingURL=getcachein.js.map