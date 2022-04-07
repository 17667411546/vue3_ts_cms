import { Module } from "vuex";
import { IRootState } from "@/store/types";
import { ISystemState } from "./types";
import {
    deletePageData,
    getPageListData,
    createPageData,
    editPageData
} from "@/service/main/system/system";
import { toAsyncAwait } from "@/utils/toAsyncAwait";

//可以写对象映射 获取请求路径
// const pageUrlMap = {
//     users: "/api/users/abc/list"
// };

const systemModule: Module<ISystemState, IRootState> = {
    namespaced: true,
    state() {
        return {
            usersList: [],
            usersCount: 0,
            roleList: [],
            roleCount: 0,
            goodsList: [],
            goodsCount: 0,
            menuList: [],
            menuCount: 0
        };
    },
    mutations: {
        changeUsersList(state, usersList: any[]) {
            state.usersList = usersList;
        },
        changeUsersCount(state, usersCount: number) {
            state.usersCount = usersCount;
        },
        changeRoleList(state, roleList: any[]) {
            state.roleList = roleList;
        },
        changeRoleCount(state, roleCount: number) {
            state.roleCount = roleCount;
        },
        changeGoodsList(state, goodsList: any[]) {
            state.goodsList = goodsList;
        },
        changeGoodsCount(state, goodsCount: number) {
            state.goodsCount = goodsCount;
        },
        changeMenuList(state, menuList: any[]) {
            state.menuList = menuList;
        },
        changeMenuCount(state, menuCount: number) {
            state.menuCount = menuCount;
        }
    },
    getters: {
        pageListData(state) {
            return (pageName: string) => {
                return (state as any)[`${pageName}List`];
                // switch (pageName) {
                //     case "users":
                //         return state.usersList;
                //     case "role":
                //         return state.roleList;
                // }
            };
        },
        pageListCount(state) {
            return (pageName: string) => {
                return (state as any)[`${pageName}Count`];
            };
        }
    },
    actions: {
        async getPageListAction({ commit }, payload: any) {
            //获取pageUrl
            const { pageName } = payload;
            const pageUrl = `/${pageName}/list`;
            // let pageUrl = "";
            // switch (pageName) {
            //     case "users":
            //         pageUrl = "/users/list";
            //         break;
            //     case "role":
            //         pageUrl = "/role/list";
            //         break;
            // }
            // const pageUrl = `${pageName}/list`;
            // const pageUrl = pageUrlMap[pageName];
            //对页面发送请求
            const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
            const [error, result] = await toAsyncAwait(getPageListData(pageUrl, payload.queryInfo));
            if (!error) {
                const { list, totalCount } = result?.data;
                commit(`change${changePageName}List`, list);
                commit(`change${changePageName}Count`, totalCount);
            }
        },
        async deletePageDataAction({ dispatch }, payload: any) {
            // 1.pageName ->/users/id
            // id
            const { pageName, id } = payload;
            const pageUrl = `/${pageName}/${id}`;
            //2.调用网络请求
            await deletePageData(pageUrl);
            //3.重新获取数据
            dispatch("getPageListAction", {
                //如何页面上有其他的搜索条件及分页的选项需要添加上
                pageName,
                queryInfo: {
                    offset: 0,
                    size: 10
                }
            });
        },
        //新建用户
        async createPageDataAction({ dispatch }, payload: any) {
            //1. 创建数据请求
            const { pageName, newData } = payload;
            const pageUrl = `/${pageName}`;
            await createPageData(pageUrl, newData);
            //2.重新获取数据
            dispatch("getPageListAction", {
                //如何页面上有其他的搜索条件及分页的选项需要添加上
                pageName,
                queryInfo: {
                    offset: 0,
                    size: 10
                }
            });
        },
        //新建用户
        async editPageDataAction({ dispatch }, payload: any) {
            //1. 创建数据请求
            const { pageName, editData, id } = payload;
            const pageUrl = `/${pageName}/${id}`;
            await editPageData(pageUrl, editData);
            //2.重新获取数据
            dispatch("getPageListAction", {
                //如何页面上有其他的搜索条件及分页的选项需要添加上
                pageName,
                queryInfo: {
                    offset: 0,
                    size: 10
                }
            });
        }
    }
};
export default systemModule;
