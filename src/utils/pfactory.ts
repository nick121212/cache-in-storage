// import { BaseFactory } from "./factory";
import { LRUFactory } from "./lrufactory";

export const promiseFactory = new LRUFactory(10);

// promiseFactory.limit = 20;
