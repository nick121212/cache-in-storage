import { assert, expect } from "chai";
import Keyv from "keyv";

import { removeCacheFromKey, getCacheInWithKey } from "../../esm/index";

describe("测试remove.js文件", () => {
  it("removeCacheFromKey方法", async () => {
    const storage = new Keyv();
    const cacheIn = Date.now();

    await storage.set("test2.a", { cacheIn, data: 1, expire: 0 });
    await storage.set("test2.b.b", { cacheIn, data: 1, expire: 0 });
    await storage.set("test2.b.c", { cacheIn, data: 1, expire: 0 });
    await storage.set("test2.a.c", { cacheIn, data: 1, expire: 0 });

    await removeCacheFromKey("test2.a", storage)

    expect(await getCacheInWithKey("test2.a", storage)).to.be.eq(0);
    expect(await getCacheInWithKey("test2.b.b", storage)).to.be.eq(cacheIn);
    expect(await getCacheInWithKey("test2.b.c", storage)).to.be.eq(cacheIn);
  });
});
