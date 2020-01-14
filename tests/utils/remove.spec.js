import { assert, expect } from "chai";

import { removeCacheFromKey, removeCacheFromRegexp, getCacheInWithKey, BaseFactory } from "../../es6/index";

describe("测试remove.js文件", () => {
  it("removeCacheFromKey方法", () => {
    const storage = new BaseFactory();
    const cacheIn = Date.now();

    storage.setItem("test2.a", JSON.stringify({ cacheIn, data: 1, expire: 0 }));
    storage.setItem("test2.b.b", JSON.stringify({ cacheIn, data: 1, expire: 0 }));
    storage.setItem("test2.b.c", JSON.stringify({ cacheIn, data: 1, expire: 0 }));
    storage.setItem("test2.a.c", JSON.stringify({ cacheIn, data: 1, expire: 0 }));

    removeCacheFromKey("test2.a", storage);
    expect(getCacheInWithKey("test2.a", storage)).to.be.eq(0);
    removeCacheFromRegexp(new RegExp("test2.b.(.*?)", "gi"), storage);
    expect(getCacheInWithKey("test2.b.b", storage)).to.be.eq(0);
    expect(getCacheInWithKey("test2.b.c", storage)).to.be.eq(0);
  });
});
