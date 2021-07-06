import { assert, expect } from "chai";

import { setExpire, getCacheInWithKey, BaseFactory , getDataFromStorage} from "../../es6/index";

describe("测试setExpire方法", () => {
  it("设置expire 从100 到200", () => {
    const storage = new BaseFactory();
    const cacheIn = Date.now();

    storage.setItem("test2", JSON.stringify({ cacheIn, data: 1, expire: 100 }));


    expect(JSON.parse(storage.getItem("test2")).expire).to.be.eq(100);

    setExpire('test2', 200, storage);

    expect(JSON.parse(storage.getItem("test2")).expire).to.be.eq(200);
  });
});
