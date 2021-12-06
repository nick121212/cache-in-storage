import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import Keyv from "keyv";

import {
    cacheDec,
    BaseFactory,
    getDataFromStorage,
    getCacheInWithKey,
    promiseCache,
} from "../../esm/index";
import { getTimeSpan, TestStorage } from "../func";

chai.should();
chai.use(chaiAsPromised);

const { assert, expect } = chai;

function test() {
    const getTimeSpanWithCache = cacheDec("test2", getTimeSpan, {
        cache: true,
        expire: 2500,
    });

    return getTimeSpanWithCache();
}

describe("测试cache.js", () => {
    it("使用缓存，设置参数为{ cache: true, expire: 10 }", async function () {
        this.timeout(50000);

        test();
        test();
        test();
        test();
        test();
        test();
        test();
        test();
        test();
        test();
        test();
        test();

        setTimeout(() => {
            test();
            test();
            test();
            test();
            test();
            test();
        }, 3000);
    });
});
