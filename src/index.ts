import promiseCache from "./cache/promise-cache";
import { cacheDec } from "./utils/cache";
import { getCacheInWithKey } from "./utils/get-cache-in";
import { getDataFromStorage } from "./utils/get-data";
import { removeCacheFromKey } from "./utils/remove";
import { setExpire } from "./utils/set-expire";

export {
    promiseCache,
    cacheDec,
    getCacheInWithKey,
    getDataFromStorage,
    removeCacheFromKey,
    setExpire
};
