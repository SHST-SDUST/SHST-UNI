import { safeDate } from "./datetime";

const convertKey = (key: string) => String(key).replace(/-storage$/g, "") + "-storage"; // 避免跟之前没有封装的缓存冲突

const convertToOrigin = (str: string) => {
    try {
        const data = JSON.parse(str);
        if (Number.isNaN(data.expire)) return null; // 之前IOS的缓存可能会存储NaN
        if (data.expire && safeDate().getTime() > data.expire) return null;
        return data.origin;
    } catch (e) {
        console.log(e);
        return str;
    }
};

const convertToStr = (origin: string, expire?: Date | null) => {
    const data: { origin: string; expire: null | number } = { origin, expire: null };
    if (expire) data.expire = expire.getTime();
    return JSON.stringify(data);
};

const storage = {
    get: function (originKey: string): string | null {
        const key = convertKey(originKey);
        const str = uni.getStorageSync(key);
        if (str === "") return null;
        const origin = convertToOrigin(str);
        if (origin === null) this.removePromise(key);
        return origin;
    },
    set: function (originKey: string, data: string, expire = null): void {
        const key = convertKey(originKey);
        const str = convertToStr(data, expire);
        return uni.setStorageSync(key, str);
    },
    getSync: function (originKey: string): string | null {
        return this.get(originKey);
    },
    setSync: function (originKey: string, data: string, expire = null): void {
        return this.set(originKey, data, expire);
    },
    getPromise: function (originKey: string): Promise<string | null> {
        const key = convertKey(originKey);
        return new Promise<string | null>(resolve => {
            uni.getStorage({
                key,
                success: res => {
                    if (res.data === "") return null;
                    const origin = convertToOrigin(res.data);
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
    setPromise: function (originKey: string, data: string, expire = null): Promise<boolean> {
        const key = convertKey(originKey);
        const str = convertToStr(data, expire);
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
