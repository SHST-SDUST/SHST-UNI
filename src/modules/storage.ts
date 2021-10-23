import { safeDate } from "./datetime";

const convertKey = (key: string) => String(key).replace(/-storage$/g, "") + "-storage"; // 避免跟之前没有封装的缓存冲突

interface SavedStructure<T> {
    origin: T;
    expire: number;
}

const convertToOrigin = <T>(str: string): null | T => {
    try {
        const data: SavedStructure<T> = JSON.parse(str);
        if (Number.isNaN(data.expire)) return null; // 之前IOS的缓存可能会存储NaN
        if (data.expire && safeDate().getTime() > data.expire) return null;
        return data.origin;
    } catch (e) {
        console.log(e);
        return null;
    }
};

const convertToStr = <T = string>(origin: T, expire?: Date | null) => {
    const data: { origin: T; expire: null | number } = { origin, expire: null };
    if (expire) data.expire = expire.getTime();
    return JSON.stringify(data);
};

const storage = {
    get: function <T = string>(originKey: string): null | T {
        const key = convertKey(originKey);
        const str = uni.getStorageSync(key);
        if (str === "") return null;
        const origin = convertToOrigin<T>(str);
        if (origin === null) this.removePromise(key);
        return origin;
    },
    set: function <T = string>(originKey: string, data: T, expire = null): void {
        const key = convertKey(originKey);
        const str = convertToStr<T>(data, expire);
        return uni.setStorageSync(key, str);
    },
    getSync: function <T = string>(originKey: string): null | T {
        return this.get(originKey);
    },
    setSync: function <T = string>(originKey: string, data: T, expire = null): void {
        return this.set<T>(originKey, data, expire);
    },
    getPromise: function <T = string>(originKey: string): Promise<T | null> {
        const key = convertKey(originKey);
        return new Promise<T | null>(resolve => {
            uni.getStorage({
                key,
                success: res => {
                    if (res.data === "") return null;
                    const origin = convertToOrigin<T>(res.data);
                    if (origin === null) this.removePromise(key);
                    resolve(origin);
                },
                fail: () => {
                    resolve(null);
                },
            });
        });
    },
    getOrigin: function (originKey: string): string | null {
        const key = convertKey(originKey);
        return uni.getStorageSync(key);
    },
    setPromise: function <T = string>(originKey: string, data: T, expire = null): Promise<boolean> {
        const key = convertKey(originKey);
        const str = convertToStr<T>(data, expire);
        return new Promise<boolean>(resolve => {
            uni.setStorage({
                key,
                data: str,
                success: () => resolve(true),
                fail: () => resolve(false),
            });
        });
    },
    remove: function (originKey: string): void {
        const key = convertKey(originKey);
        return uni.removeStorageSync(key);
    },
    removeSync: function (originKey: string): void {
        return this.remove(originKey);
    },
    removePromise: function (originKey: string): Promise<boolean> {
        const key = convertKey(originKey);
        return new Promise<boolean>(resolve => {
            uni.removeStorage({
                key,
                success: () => resolve(true),
                fail: () => resolve(false),
            });
        });
    },
    clear: function (): void {
        return uni.clearStorageSync();
    },
    clearSync: function (): void {
        return this.clear();
    },
    clearPromise: function (): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.clear();
            resolve(true);
        });
    },
};

export default storage;
