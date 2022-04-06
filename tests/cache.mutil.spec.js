import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import Keyv from "keyv";

import {
    cacheDec,
    BaseFactory,
    getDataFromStorage,
    promiseCache,
    getCacheInWithKey,
} from "../esm/index";
import { getTimeSpan, TestStorage } from "./func";

chai.should();
chai.use(chaiAsPromised);

const { assert, expect } = chai;

describe("测试cache.js", () => {
    const date = Date.now();

    it("使用缓存", async function () {
        this.timeout(5000);
        let getTimeSpanWithCache = cacheDec("test2", getTimeSpan, {
            cache: true,
            expire: 10000,
        });
        await getTimeSpanWithCache();

        const cacheIn = [getCacheInWithKey("test2", promiseCache)];

        getTimeSpanWithCache = cacheDec("test2", getTimeSpan, {
            cache: true,
            expire: 50,
        });

        await getTimeSpanWithCache();

        cacheIn.push(getCacheInWithKey("test2", promiseCache));

        getTimeSpanWithCache = cacheDec("test2", getTimeSpan, {
            cache: true,
            expire: 50,
        });

        await getTimeSpanWithCache();

        cacheIn.push(getCacheInWithKey("test2", promiseCache));

        expect(cacheIn[0]).to.equal(cacheIn[1]);
        expect(cacheIn[0]).to.equal(cacheIn[2]);
    });
});
