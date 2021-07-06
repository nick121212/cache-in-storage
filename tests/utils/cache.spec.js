import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import Keyv from "keyv";

import { cacheDec, BaseFactory, getDataFromStorage } from "../../esm/index";
import { getTimeSpan, TestStorage } from "../func";

chai.should();
chai.use(chaiAsPromised);

const { assert, expect } = chai;

describe("测试cache.js", () => {
    it("不使用缓存的方式", async function () {
        this.timeout(5000);
        const getTimeSpanWithCache = cacheDec("test0", getTimeSpan);

        const timespan = await getTimeSpanWithCache();
        const timespan1 = await getTimeSpanWithCache();

        expect(timespan).to.not.equal(timespan1);
    });

    it("不是用缓存的方式{ cache: false }", async function () {
        this.timeout(5000);
        const getTimeSpanWithCache = cacheDec("test1", getTimeSpan, { cache: false });

        const timespan = await getTimeSpanWithCache();
        const timespan1 = await getTimeSpanWithCache();

        expect(timespan).to.not.equal(timespan1);
    });

    it("使用缓存，设置参数为{ cache: true }", async function () {
        this.timeout(5000);
        const getTimeSpanWithCache = cacheDec("test1", getTimeSpan, { cache: true });

        const timespan = await getTimeSpanWithCache();
        const timespan1 = await getTimeSpanWithCache();

        expect(timespan).to.equal(timespan1);
    });

    it("使用缓存，设置参数为{ cache: true, expire: 10 }", async function () {
        this.timeout(5000);
        const getTimeSpanWithCache = cacheDec("test2", getTimeSpan, { cache: true, expire: 10 });

        const timespan = await getTimeSpanWithCache();
        await getTimeSpan();
        const timespan1 = await getTimeSpanWithCache();

        expect(timespan).to.not.equal(timespan1);
    });

    it("使用缓存，设置参数为{ cache: true, expire: 10 }", async function () {
        this.timeout(5000);
        const getTimeSpanWithCache = cacheDec("test3", getTimeSpan, { cache: true });
        const getTimeSpanWithCache1 = cacheDec("test3", getTimeSpan, { cache: true });
        const getTimeSpanWithCache2 = cacheDec("test3", getTimeSpan, { cache: true, reload: true });

        const timespan = await getTimeSpanWithCache();
        const timespan1 = await getTimeSpanWithCache1();
        const timespan2 = await getTimeSpanWithCache2();

        expect(timespan).to.equal(timespan1);
        expect(timespan).to.not.equal(timespan2);
    });

    it("使用缓存，方法执行返回错误，设置参数为{ cache: true }", async function () {
        this.timeout(5000);
        const getTimeSpanWithCache = cacheDec("test4", getTimeSpan, { cache: true });

        return assert.isRejected(getTimeSpanWithCache(true), Error, "test");
    });

    it("使用缓存，使用第三个参数，{ cache: true }", async function () {
        this.timeout(5000);

        const localStorage = new Keyv();
        const getTimeSpanWithCache = cacheDec("test5", getTimeSpan, { cache: true }, localStorage);

        const timespan1 = await getTimeSpanWithCache();
        const data = await getDataFromStorage("test5", localStorage);

        expect(data.data).to.be.equal((await localStorage.get("test5")).data);
        expect(data.data).to.be.equal(timespan1);
    });

    it("使用缓存，测试并发情况", async function () {
        this.timeout(5000);
        const getTimeSpanWithCache = cacheDec("test6", getTimeSpan, { cache: true });
        const getTimeSpanWithCache1 = cacheDec("test6", getTimeSpan, { cache: true });
        const getTimeSpanWithCache2 = cacheDec("test6", getTimeSpan, { cache: true, reload: true });

        const [timespan, timespan1, timespan2] = await Promise.all([getTimeSpanWithCache(), getTimeSpanWithCache1(), getTimeSpanWithCache2()]);

        expect(timespan).to.equal(timespan1);
        expect(timespan).to.not.equal(timespan2);
    });

    it("使用缓存，测试并发情况", async function () {
        this.timeout(5000);
        const getTimeSpanWithCache = cacheDec("test6", getTimeSpan, { cache: true }, TestStorage);
        const getTimeSpanWithCache1 = cacheDec("test6", getTimeSpan, { cache: true }, TestStorage);
        const getTimeSpanWithCache2 = cacheDec("test6", getTimeSpan, { cache: true, reload: true }, TestStorage);

        const [timespan, timespan1] = await Promise.all([getTimeSpanWithCache(), getTimeSpanWithCache1()]);
        const timespan2 = await getTimeSpanWithCache2();
        const finData = await TestStorage.get("test6");

        expect(timespan).to.equal(timespan1);
        expect(timespan).to.not.equal(timespan2);
        expect(timespan2).to.equal(finData.data);
    });

});
