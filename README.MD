# 前端Cache工具

![coveralls](https://coveralls.io/repos/github/nick121212/cache-in-storage/badge.svg?branch=master)
![travis](https://travis-ci.org/nick121212/cache-in-storage.svg?branch=master)

前端经常碰到需要缓存一些方法的情况（比如接口，wx.login等），有些情况下，数据还需要落地（localStorage，wx的本地缓存等）。

## 安装

```shelljs
npm i cache-in-storage
```

## 快速使用

```js
import { cacheDec } from "cache-in-storage";

const getTimeSpan = async (isError = false) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      if (isError) {
        return _reject(new Error("test"));
      }
      resolve(Date.now());
    }, 200);
  });
};

// 对getTimeSpan进行缓存，并把缓存结果放入localStorage
const getTimeSpanWithCache = cacheDec(getTimeSpan, "keyInCache", { cache:true }, localStorage);

// 此时执行方法返回的值都是相同的
getTimeSpanWithCache().then(console.log);
getTimeSpanWithCache().then(console.log);
getTimeSpanWithCache(true).catch(console.error);
```

## API

> cacheDec: ```(func: (...args: any[]) => Promise<any>, key: string, settings: CacheOptionModel, storage?: CacheNStorage, promiseStorage?: CacheNStorage): (...args: any[]) => Promise<any>```

一个高阶函数，包装一个Promise方法，返回一个方法((...args)=>Promise);

参数说明

| 参数名   | 类型               | 说明               |
| -------- | ------------------ | ------------------ |
| func     | (...args)=>Promise | 需要包装缓存的方法 |
| key      | String             | 缓存的key值        |
| storage  | CacheNStorage      | 缓存的类           |
| settings | CacheOptionModel   | 缓存设置           |

> getCacheInWithKey: ```getCacheInWithKey = (key: string, storage?: Storage): number```

返回key值在进入缓存的时间戳，如果不存在键值则返回0。

| 参数名   | 类型               | 说明               |
| -------- | ------------------ | ------------------ |
| key      | String             | 缓存的key值        |
| storage  | CacheNStorage      | 缓存的类           |

> getDataFromStorage: ```(key: string, storage: Storage): CacheDataModel | null```

从缓存类中获取数据，如果不存在缓存，则返回null。

| 参数名   | 类型               | 说明               |
| -------- | ------------------ | ------------------ |
| key      | String             | 缓存的key值        |
| storage  | CacheNStorage      | 缓存的类           |

> removeCacheFromKey: ```(key: string, storage: CacheNStorage): void```

从缓存类中删除一个键值。

| 参数名   | 类型               | 说明               |
| -------- | ------------------ | ------------------ |
| key      | String             | 缓存的key值        |
| storage  | CacheNStorage      | 缓存的类           |

> removeCacheFromRegexp: ```(regexp: RegExp, storage: CacheNStorage): void```

根据正则匹配，从缓存类中删除匹配的键值。

| 参数名   | 类型               | 说明               |
| -------- | ------------------ | ------------------ |
| key      | String             | 缓存的key值        |
| storage  | CacheNStorage      | 缓存的类           |

> BaseFactory

继承自CacheNStorage接口，提供了操作缓存的方法。此类的数据缓存在内存中。需要扩展一个forEach方法。

```ts

export interface CacheNStorage extends Storage {
  forEach(fn: (key: string, val: any) => void): void;
}

/** An interface of the Web Storage API provides access to a particular domain's session or local storage. It allows, for example, the addition, modification, or deletion of stored data items. */
interface Storage {
    /**
     * Returns the number of key/value pairs currently present in the list associated with the
     * object.
     */
    readonly length: number;
    /**
     * Empties the list associated with the object of all key/value pairs, if there are any.
     */
    clear(): void;
    /**
     * value = storage[key]
     */
    getItem(key: string): string | null;
    /**
     * Returns the name of the nth key in the list, or null if n is greater
     * than or equal to the number of key/value pairs in the object.
     */
    key(index: number): string | null;
    /**
     * delete storage[key]
     */
    removeItem(key: string): void;
    /**
     * storage[key] = value
     */
    setItem(key: string, value: string): void;
    [name: string]: any;
}
```

> LruFactory

继承自BaseStorage接口，提供了操作缓存的方法并支持lru缓存算法。此类的数据缓存在内存中。

## 类型说明

> CacheOptionModel

| 参数名 | 类型    | 说明        |
| ------ | ------- | ----------- |
| cache  | boolean | 缓存开关 |
| reload | boolean | 重刷缓存开关    |
| expire | boolean | 过期时间（单位毫秒）    |

## changelog

### V2.0.0

1. 修改了promise缓存的机制，添加了缓存lru算法

### V1.0.1

1. 默认导出了内存factory

## LICENSE

[MIT](./LICENSE.md)
