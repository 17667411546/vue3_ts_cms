import { Module } from "vuex";
import { IDashboardState } from "./types";
import { IRootState } from "../../types";
import {
    getCategoryGoodsCount,
    getCategoryGoodsSale,
    getCategoryGoodsFavor,
    getAddressGoodsSale
} from "@/service/main/analysis/dashboard";

const dashboard: Module<IDashboardState, IRootState> = {
    namespaced: true,
    state() {
        return {
            categoryGoodsCount: [],
            categoryGoodsSale: [],
            categoryGoodsFavor: [],
            addressGoodsSales: []
        };
    },
    mutations: {
        changeCategoryGoodsCount(state, payload) {
            state.categoryGoodsCount = payload;
        },
        changeCategoryGoodsSale(state, payload) {
            state.categoryGoodsSale = payload;
        },
        changeCategoryGoodsFavor(state, payload) {
            state.categoryGoodsFavor = payload;
        },
        changeAddressGoodsSales(state, payload) {
            state.addressGoodsSales = payload;
        }
    },
    actions: {
        async getDashboardDataAction({ commit }) {
            const categoryCountResult = await getCategoryGoodsCount();
            commit("changeCategoryGoodsCount", categoryCountResult.data);
            const categorySaleResult = await getCategoryGoodsSale();
            commit("changeCategoryGoodsSale", categorySaleResult.data);
            const categoryFavorResult = await getCategoryGoodsFavor();
            commit("changeCategoryGoodsFavor", categoryFavorResult.data);
            const addressSaleResult = await getAddressGoodsSale();
            commit("changeAddressGoodsSales", addressSaleResult.data);
        }
    }
};
export default dashboard;
