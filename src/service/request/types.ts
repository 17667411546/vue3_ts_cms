import type { AxiosRequestConfig, AxiosResponse } from "axios";

//请求响应拦截器类型
export interface ServeiceInterceptorsType<T = AxiosResponse> {
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    requestInterceptorCatch?: (err: any) => any;
    responseInterceptor?: (res: T) => T;
    responseInterceptorCatch?: (err: any) => any;
}

export interface ServiceConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: ServeiceInterceptorsType<T>;
    showLoading?: boolean;
}
