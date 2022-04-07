//本地缓存工具类
class LocalCache {
    setCache(key: string, value: any) {
        window.localStorage.setItem(key.trim(), JSON.stringify(value));
    }
    getCache(key: string) {
        const value = window.localStorage.getItem(key.trim());
        if (value) {
            return JSON.parse(value);
        }
    }
    deleteCache(key: string) {
        window.localStorage.removeItem(key.trim());
    }
    clearCache() {
        window.localStorage.clear();
    }
}
export default new LocalCache();
