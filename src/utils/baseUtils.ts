/**
 * 作者：马玉万
 * 自定义封装全局缓存属性
 * 使用API
 * - window.localStorage
 * - window.sessionStorage
 * 枚举缓存类型，自封装缓存API
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
    if (value === undefined) {
      throw new Error("缓存中不存在此属性");
    } else {
      return JSON.parse(String(value));
    }
  }
  remove(key: string): unknown {
    let value = this.storage.getItem(key);
    if (value === undefined) {
      throw new Error("缓存中不存在此属性");
    } else {
      return JSON.parse(String(value));
    }
  }
  clear(): void {
    this.storage.clear();
  }
}

const FLocal = new freeStorage(StorageType.L);
const Fsession = new freeStorage(StorageType.S);

export { FLocal, Fsession };
