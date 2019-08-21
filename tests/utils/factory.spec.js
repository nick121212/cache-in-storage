import { assert, expect } from "chai";

import { BaseFactory } from "../../libs/index";

describe("测试Factory类", () => {
  let factory = new BaseFactory();

  beforeEach(() => {
    factory = new BaseFactory();
  });

  it("Factory类是一个对象, 拥有getItem,setItem,forEach，clear方法", () => {
    expect(factory).to.be.a("object");
    expect(factory.getItem).to.be.a("function");
    expect(factory.setItem).to.be.a("function");
    expect(factory.removeItem).to.be.a("function");
    expect(factory.key).to.be.a("function");
    expect(factory.length).to.be.a("number");
    expect(factory.forEach).to.be.a("function");
    expect(factory.clear).to.be.a("function");
  });

  it("Factory测试key方法",()=>{
    expect(factory.key(1)).to.be.eq("1");
  })

  it("Factory测试clear,forEach功能", () => {
    let loopCount = 0;

    factory.setItem("1", { a: 1 });
    factory.setItem("2", { a: 2 });
    factory.setItem("3", { a: 3 });

    factory.forEach((k, v) => {
      expect(v).to.be.a("object");
      expect(k).to.be.a("string");
      if (++loopCount > 2) {
        return false;
      }
    });

    factory.forEach();

    expect(loopCount).to.equal(3);

    factory.clear();
    loopCount = 0;
    factory.forEach((k, v) => {
      loopCount++;
    });
    expect(loopCount).to.equal(0);
  });
});
