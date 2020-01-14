export const removeCacheFromKey = (key, storage) => {
    if (storage) {
        storage.removeItem(key);
    }
};
export const removeCacheFromRegexp = (regexp, storage) => {
    if (!storage) {
        return;
    }
    storage.forEach((key) => {
        regexp.lastIndex = 0;
        if (!regexp.test(key)) {
            return;
        }
        storage.removeItem(key);
    });
};
//# sourceMappingURL=remove.js.map