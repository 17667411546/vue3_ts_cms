import Service from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";
import localCache from "@/utils/cache";
export const service = new Service({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    //单个实例的请求拦截
    interceptors: {
        requestInterceptor: (config) => {
            // console.log("单个实例请求成功拦截");
            // 携带token
            const token = localCache.getCache("token") ?? "";
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }
        // requestInterceptorCatch: (err) => err,
        // responseInterceptor: (res) => {
        //     console.log("单个实例响应成功拦截");
        //     return res;
        // },
        // responseInterceptorCatch: (err) => err
    }
});
