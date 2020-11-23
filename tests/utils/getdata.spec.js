import { assert, expect } from "chai";

import { getDataFromStorage } from "../../es6/index";

describe("测试getData.js文件", () => {
  it("getDataFromStorage", () => {
    // const storage = new BaseFactory();
    // const cacheIn = Date.now();

    // storage.setItem("test2.a", JSON.stringify({ cacheIn, data: 1, expire: 0 }));
    // storage.setItem("test2.b.b", JSON.stringify({ cacheIn, data: 1, expire: 0 }));
    // storage.setItem("test2.b.c", JSON.stringify({ cacheIn, data: 1, expire: 0 }) + "1");

    // expect(getDataFromStorage("test2.a")).to.be.eq(null);
    // // console.log(JSON.parse(storage.getItem("test2.b.c")));
    // expect(getDataFromStorage("test2.b.c", storage)).to.be.eq(null);
  });
});
