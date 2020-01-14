import { assert, expect } from "chai";

import { getCacheInWithKey, BaseFactory } from "../../es6/index";

describe("测试getCacheInWithKey方法", () => {
  it("Factory类是一个对象, 拥有getItem,setItem,forEach，clear方法", () => {
    const storage = new BaseFactory();
    const cacheIn = Date.now();

    storage.setItem("test2", JSON.stringify({ cacheIn, data: 1, expire: 0 }));

    expect(getCacheInWithKey("test1")).to.be.eq(0);
    expect(getCacheInWithKey("test1", storage)).to.be.eq(0);
    expect(getCacheInWithKey("test2", storage)).to.be.eq(cacheIn);
  });
});
