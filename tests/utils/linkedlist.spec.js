import { assert, expect } from "chai";

import { LinkedList } from "../../libs/utils/linkedlist";

describe("linkedlist.js文件", () => {
    let list = null;

    beforeEach(() => {
        list = new LinkedList();

        list.insertToLast("1");
        list.insertToLast("2");
        list.insertToLast("3");
        list.insertToLast("4");
        list.insertToLast("5");
        list.insertToLast("6");
        list.insertToLast("7");
        list.insertToLast("8");
        list.insertToLast("9");
        list.insertToLast("10");
    });

    it("findLast方法", () => {
        expect(list.findLast().element).to.be.eq("10");
    });

    it("findWithElement方法", () => {
        expect(list.findWithElement("10").element).to.be.eq("10");
        expect(list.findWithElement("11")).to.be.eq(undefined);
    });

    it("insert方法", () => {
        list.insert("11", "10");
        expect(list.findWithElement("11")).to.be.eq(list.findLast());
    });

    it("insertToLast方法", () => {
        list.insertToLast("12");
        expect(list.findWithElement("12")).to.be.eq(list.findLast());
    });

    it("moveToLast方法", () => {
        list.moveToLast("1");
        expect(list.findWithElement("1")).to.be.eq(list.findLast());
    });

    it("remove方法", () => {
        list.remove("1");
        expect(list.findWithElement("1")).to.be.eq(undefined);
    });

    it("removeFirst方法", () => {
        list.removeFirst();
        expect(list.findWithElement("1")).to.be.eq(undefined);
    });
});
