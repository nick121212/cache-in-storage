import { assert, expect } from "chai";
import Keyv from "keyv";

import { getCacheInWithKey } from "../../esm/index";

describe("测试getCacheInWithKey方法", () => {
  it("Factory类是一个对象, 拥有getItem,setItem,forEach，clear方法", async() => {
    const storage = new Keyv();
    const cacheIn = Date.now();

    storage.set("test2", { cacheIn, data: 1, expire: 0 });

    expect(await getCacheInWithKey("test1")).to.be.eq(0);
    expect(await getCacheInWithKey("test1", storage)).to.be.eq(0);
    expect(await getCacheInWithKey("test2", storage)).to.be.eq(cacheIn);
  });
});
