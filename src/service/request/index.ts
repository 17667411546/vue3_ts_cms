import axios from "axios";
import { ElLoading, ElMessage } from "element-plus";
import type { AxiosInstance } from "axios";
import "element-plus/lib/theme-chalk/el-loading.css";

import type { ServeiceInterceptorsType, ServiceConfig } from "./types";
import { ILoadingInstance } from "element-plus/lib/el-loading/src/loading.type";

const DEFAULT_LOADING = true;

export default class Service {
    instance: AxiosInstance;
    interceptors?: ServeiceInterceptorsType;
    showLoading: boolean;
    loading?: ILoadingInstance;
    constructor(config: ServiceConfig) {
        this.instance = axios.create(config);
        this.interceptors = config.interceptors;
        this.showLoading = config.showLoading ?? DEFAULT_LOADING;

        if (this.interceptors) {
            //单个实例请求拦截
            this.instance.interceptors.request.use(
                this.interceptors?.requestInterceptor,
                this.interceptors?.requestInterceptorCatch
            );
            //单个实例响应拦截
            this.instance.interceptors.response.use(
                this.interceptors?.responseInterceptor,
                this.interceptors?.responseInterceptorCatch
            );
        }

        //全部实例的请求拦截
        this.instance.interceptors.request.use(
            (config) => {
                // console.log("全局请求成功拦截");
                this.showLoading
                    ? (this.loading = ElLoading.service({
                          lock: true,
                          text: "正在努力请求中",
                          background: "rgba(0,0,0,.5)"
                      }))
                    : "";
                return config;
            },
            (err) => {
                return err;
            }
        );
        //全部实例的响应拦截
        this.instance.interceptors.response.use(
            (res) => {
                // console.log("全局响应成功拦截");
                // console.log("loading");
                this.loading?.close();
                // eslint-disable-next-line no-constant-condition
                const cssStr = "background:skyblue;font-weight: bold;";
                console.info(`%c [${res.config.url}]:`, cssStr, res.data);
                return res.data;
            },
            (err) => {
                this.loading?.close();
                ElMessage({
                    message: err.response.data,
                    type: "error"
                });
                return Promise.reject(err);
            }
        );
    }

    // request<T>(config: ServiceConfig): Promise<T> {
    //     return new Promise((resolve, reject) => {
    //         if (config.showLoading === false) {
    //             this.showLoading = config.showLoading;
    //         }
    //         this.instance
    //             .request(config)
    //             .then((res) => {
    //                 this.showLoading = DEFAULT_LOADING;
    //                 resolve(res);
    //             })
    //             .catch((err) => {
    //                 this.showLoading = DEFAULT_LOADING;
    //                 return err;
    //             });
    //     });
    // }

    //单个请求的拦截
    request<T = any>(config: ServiceConfig<T>): Promise<T> {
        return new Promise((resolve) => {
            //请求拦截
            if (config.interceptors?.requestInterceptor) {
                config = config.interceptors.requestInterceptor(config);
            }
            if (config.showLoading === false) {
                this.showLoading = config.showLoading;
            }
            this.instance
                .request<any, T>(config)
                .then((res) => {
                    //单独响应拦截
                    if (config.interceptors?.responseInterceptor) {
                        res = config.interceptors.responseInterceptor(res);
                        this.showLoading = DEFAULT_LOADING;
                        // resolve(res);
                    }
                    resolve(res);
                })
                .catch((err) => {
                    this.showLoading = DEFAULT_LOADING;
                    return err;
                });
        });
    }
    get<T = any>(config: ServiceConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: "GET" });
    }
    post<T = any>(config: ServiceConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: "POST" });
    }
    delete<T = any>(config: ServiceConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: "DELETE" });
    }
    patch<T = any>(config: ServiceConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: "PATCH" });
    }
}
