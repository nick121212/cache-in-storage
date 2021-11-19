import { assert, expect } from "chai";
import Keyv from "keyv";

import { setExpire, getCacheInWithKey , getDataFromStorage} from "../../esm/index";

describe("测试setExpire方法", () => {
  it("设置expire 从100 到200", async() => {
    const storage = new Keyv();
    const cacheIn = Date.now();

    await storage.set("test2", JSON.stringify({ cacheIn, data: 1, expire: 100 }));

    let test2 = await storage.get("test2");

    expect(JSON.parse(test2).expire).to.be.eq(100);

    await setExpire('test2', 200, storage);

    test2 = await storage.get("test2");

    expect(JSON.parse(test2).expire).to.be.eq(200);
  });
});
