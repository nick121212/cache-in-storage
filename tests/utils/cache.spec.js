import chai from "chai";
import chaiAsPromised from "chai-as-promised";

import { cacheDec, BaseFactory, getDataFromStorage } from "../../libs/index";
import { getTimeSpan } from "../func";

chai.should();
chai.use(chaiAsPromised);

const { assert, expect } = chai;

describe("测试cache.js", () => {
    it("不使用缓存的方式", async function() {
        this.timeout(5000);
        const getTimeSpanWithCache = cacheDec(getTimeSpan, "test0");

        const timespan = await getTimeSpanWithCache();
        const timespan1 = await getTimeSpanWithCache();

        expect(timespan).to.not.equal(timespan1);
    });

    it("不是用缓存的方式{ cache: false }", async function() {
        this.timeout(5000);
        const getTimeSpanWithCache = cacheDec(getTimeSpan, "test1", { cache: false });

        const timespan = await getTimeSpanWithCache();
        const timespan1 = await getTimeSpanWithCache();

        expect(timespan).to.not.equal(timespan1);
    });

    it("使用缓存，设置参数为{ cache: true }", async function() {
        this.timeout(5000);
        const getTimeSpanWithCache = cacheDec(getTimeSpan, "test1", { cache: true });

        const timespan = await getTimeSpanWithCache();
        const timespan1 = await getTimeSpanWithCache();

        expect(timespan).to.equal(timespan1);
    });

    it("使用缓存，设置参数为{ cache: true, expire: 10 }", async function() {
        this.timeout(5000);
        const getTimeSpanWithCache = cacheDec(getTimeSpan, "test2", { cache: true, expire: 10 });

        const timespan = await getTimeSpanWithCache();
        await getTimeSpan();
        const timespan1 = await getTimeSpanWithCache();

        expect(timespan).to.not.equal(timespan1);
    });

    it("使用缓存，设置参数为{ cache: true, expire: 10 }", async function() {
        this.timeout(5000);
        const getTimeSpanWithCache = cacheDec(getTimeSpan, "test3", { cache: true });
        const getTimeSpanWithCache1 = cacheDec(getTimeSpan, "test3", { cache: true });
        const getTimeSpanWithCache2 = cacheDec(getTimeSpan, "test3", { cache: true, reload: true });

        const timespan = await getTimeSpanWithCache();
        const timespan1 = await getTimeSpanWithCache1();
        const timespan2 = await getTimeSpanWithCache2();

        expect(timespan).to.equal(timespan1);
        expect(timespan).to.not.equal(timespan2);
    });

    it("使用缓存，方法执行返回错误，设置参数为{ cache: true }", async function() {
        this.timeout(5000);
        const getTimeSpanWithCache = cacheDec(getTimeSpan, "test4", { cache: true });

        return assert.isRejected(getTimeSpanWithCache(true), Error, "test");
    });

    it("使用缓存，使用第三个参数，{ cache: true }", async function() {
        this.timeout(5000);

        const localStorage = new BaseFactory();
        const getTimeSpanWithCache = cacheDec(getTimeSpan, "test5", { cache: true, local: true }, localStorage);

        const timespan1 = await getTimeSpanWithCache();
        const data = getDataFromStorage("test5", localStorage);

        expect(data.data).to.be.equal(JSON.parse(localStorage.getItem("test5")).data);
        expect(data.data).to.be.equal(timespan1);
    });
});
