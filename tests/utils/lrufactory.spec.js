import { assert, expect } from "chai";

import { LRUFactory } from "../../es6/utils/lrufactory";

describe("lrufactory.js文件", () => {
    let storage;

    beforeEach(() => {
        storage = new LRUFactory(2);

        storage.setItem("1", "1");
        storage.setItem("2", "2");
        storage.setItem("3", "3");
        storage.setItem("4", "4");
    });

    it("测试limit=2的情况", () => {
        expect(storage.linkList.size).to.be.eq(2);
        expect(storage.linkList.findLast().element).to.be.eq("4");
    });

    it("测试调用getItem的情况", () => {
        storage.getItem("3");

        expect(storage.linkList.findLast().element).to.be.eq("3");
    });

    it("测试调用removeItem的情况", () => {
        storage.removeItem("3");
        storage.removeItem("2");

        expect(storage.linkList.size).to.be.eq(1);
    });
});
