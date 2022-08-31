/**
 * Storage Version 0.0.1
 *
 * author：Nan
 *
 * 枚举缓存类型，自封装缓存API
 *
 * @param { Storage } window.localStorage 持久化缓存
 * @param { Storage } window.sessionStorage 会话级缓存
 *
 */
enum StorageType {
  L = "localStorage",
  S = "sessionStorage",
}
class freeStorage {
  private storage: Storage;
  constructor(type: StorageType) {
    this.storage = window[type];
  }
  set(key: string, data: unknown): void {
    let value: string = typeof data === "string" ? data : JSON.stringify(data);
    this.storage.setItem(key, value);
  }
  get(key: string): unknown {
    let value = this.storage.getItem(key);
    if (value === undefined || value === null) {
      console.error(`获取缓存属性错误，缓存中不存在属性：${key}`);
    } else {
      return JSON.parse(value as string);
    }
  }
  remove(key: string): void {
    this.storage.removeItem(key);
  }
  clear(): void {
    this.storage.clear();
  }
}

const FLocal = new freeStorage(StorageType.L);
const Fsession = new freeStorage(StorageType.S);

export { FLocal, Fsession, freeStorage };

