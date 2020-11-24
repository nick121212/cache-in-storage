import { assert, expect } from "chai";
import Keyv from "keyv";

import { getDataFromStorage } from "../../esm/index";

describe("测试getData.js文件", () => {
  it("getDataFromStorage", async () => {
    const storage = new Keyv();
    const cacheIn = Date.now();

    const cacheData = { cacheIn, data: 1, expire: 0 };

    storage.set("test2.a", cacheData);
    storage.set("test2.b.b", cacheData);
    storage.set("test2.b.c", cacheData);

    expect(await getDataFromStorage("test2.a.a")).to.be.eq(null);
    expect((await getDataFromStorage("test2.b.c", storage)).data).to.be.eq(cacheData.data);
  });
});
