import { Module } from "vuex";
import { ElMessage } from "element-plus";
import { ILoginState } from "./types";
import { IRootState } from "../types";
import localCache from "@/utils/cache";
import { mapMenuToRoutes, mapMenusToPermissions } from "@/utils/map-menus";
import router from "@/router";
import { toAsyncAwait } from "@/utils/toAsyncAwait";

import {
    accountLoginRequest,
    requestUserInfoById,
    requestUserMenusByRoleId
} from "@/service/login/login";

const loginModule: Module<ILoginState, IRootState> = {
    namespaced: true,
    state() {
        return {
            token: "",
            userInfo: {},
            userMenus: [],
            permissions: []
        };
    },
    mutations: {
        setToken(state, token: string) {
            state.token = token;
        },
        setUserInfo(state, userInfo: any) {
            state.userInfo = userInfo;
        },
        setUserMenus(state, userMenus: any) {
            state.userMenus = userMenus;
            //挂载动态路由
            const routes = mapMenuToRoutes(userMenus);
            //挂载到路由的对象
            routes.forEach((route) => {
                router.addRoute("main", route);
            });
            //获取用户按钮权限
            const permissions = mapMenusToPermissions(userMenus);
            state.permissions = permissions;
        }
    },
    actions: {
        async accountLoginAction({ commit, dispatch }, payload: any) {
            //1.登录逻辑
            const [error, loginResult] = await toAsyncAwait(accountLoginRequest(payload));
            if (!error) {
                const { id, token } = loginResult!.data;
                commit("setToken", token);
                localCache.setCache("token", token);
                //2.获取用户信息
                const { data: userInfo } = await requestUserInfoById(id);
                commit("setUserInfo", userInfo);
                //缓存用户信息
                localCache.setCache("userInfo", userInfo);
                //3.请求用户菜单
                const { data: userMenus } = await requestUserMenusByRoleId(userInfo.role.id);
                commit("setUserMenus", userMenus);
                // 缓存菜单列表
                localCache.setCache("userMenus", userMenus);
                ElMessage({
                    message: "登入成功！",
                    type: "success"
                });
                //4.登录成功跳转首页
                router.push("/main");
                //拿到token之后发送初始化请求(完整的role/department)
                dispatch("getInitialDataAction", null, { root: true });
            }
        },
        phoneLoginAction(_, payload: any) {
            console.log("手机号登录。。。。");
            console.log(payload);
        },
        //页面刷新时保存vuex数据
        loadLocalLogin({ commit, dispatch }) {
            const token = localCache.getCache("token");
            const userInfo = localCache.getCache("userInfo");
            const userMenus = localCache.getCache("userMenus");
            if (token) {
                commit("setToken", token);
                //拿到token之后发送初始化请求(完整的role/department)
                dispatch("getInitialDataAction", null, { root: true });
            }
            if (userInfo) {
                commit("setUserInfo", userInfo);
            }
            if (userMenus) {
                commit("setUserMenus", userMenus);
            }
        }
    }
};
export default loginModule;
