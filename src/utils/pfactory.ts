// import { BaseFactory } from "./factory";
import { LRUFactory } from "./lrufactory";

export const promiseFactory = new LRUFactory(100);

// promiseFactory.limit = 20;