import { assert, expect } from "chai";

import { LinkedNode } from "../../es6/utils/node";

describe("node.js文件", () => {
    it("构造函数", () => {
        const node1 = new LinkedNode("1");
        const node2 = new LinkedNode("2");

        expect(node1.element).to.be.eq("1");
        expect(node2.element).to.be.eq("2");
    });
});
