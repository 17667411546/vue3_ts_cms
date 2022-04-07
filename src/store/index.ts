import { createStore, Store, useStore as useVuexStore } from "vuex";
import { IRootState, IStoreType } from "./types";
import login from "./login/login";
import system from "./main/system/system";
import { getPageListData } from "@/service/main/system/system";
import dashboard from "./main/analysis/dashboard";

const store = createStore<IRootState>({
    state: () => {
        return {
            name: "",
            entireDepartment: [],
            entireRole: [],
            entireMenuTree: []
        };
    },
    mutations: {
        changeEntrieDepartment(state, payload) {
            state.entireDepartment = payload;
        },
        changeEntrieRole(state, payload) {
            state.entireRole = payload;
        },
        changeEntrieMenuTree(state, payload) {
            state.entireMenuTree = payload;
        }
    },
    actions: {
        async getInitialDataAction({ commit }) {
            //请求部门角色数据
            const departmentResult = await getPageListData("/department/list", {
                offset: 0,
                size: 100
            });
            const { list: departmentList } = departmentResult.data;
            const departmentRoleResult = await getPageListData("/role/list", {
                offset: 0,
                size: 100
            });
            const { list: roleList } = departmentRoleResult.data;
            //弹框树形数据
            const menuList = await getPageListData("/menu/list", {});
            const { list: menuTree } = menuList.data;
            //保存数据
            commit("changeEntrieDepartment", departmentList);
            commit("changeEntrieRole", roleList);
            commit("changeEntrieMenuTree", menuTree);
        }
    },
    modules: {
        login,
        system,
        dashboard
    }
});

export function setupStore() {
    store.dispatch("login/loadLocalLogin");
    // store.dispatch("getInitialDataAction");
}
//创建自己的useStore() 并添加模块类型 在其他位置使用不会报错
export function useStore(): Store<IStoreType> {
    return useVuexStore();
}
export default store;
