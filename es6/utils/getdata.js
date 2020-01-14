export const getDataFromStorage = (key, storage) => {
    if (!storage) {
        return null;
    }
    let dataFromStorage = storage.getItem(key);
    if (typeof dataFromStorage === "string") {
        try {
            dataFromStorage = JSON.parse(dataFromStorage);
        }
        catch (e) {
            storage.removeItem(key);
            return null;
        }
    }
    const { expire = 0, cacheIn = 0, data = null } = dataFromStorage || {};
    if (expire && cacheIn && cacheIn + expire < Date.now()) {
        storage.removeItem(key);
        return null;
    }
    if (!data) {
        return null;
    }
    return dataFromStorage;
};
//# sourceMappingURL=getdata.js.map