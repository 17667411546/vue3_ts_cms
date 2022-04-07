<template>
    <div class="dashboard">
        <el-row :gutter="10">
            <el-col :span="7">
                <my-card title="分类商品数量(饼图)">
                    <pie-echart :pieData="categoryGoodsCount"></pie-echart>
                </my-card>
            </el-col>
            <el-col :span="10">
                <my-card title="不同城市商品销量">
                    <map-echart :map-data="mapData"></map-echart>
                </my-card>
            </el-col>
            <el-col :span="7">
                <my-card title="分类商品数量(玫瑰图)">
                    <rose-echart :roseData="categoryGoodsCount"></rose-echart>
                </my-card>
            </el-col>
        </el-row>
        <el-row :gutter="10" class="content-row">
            <el-col :span="12">
                <my-card title="分类商品销量">
                    <line-echart v-bind="categoryGoodsSale"></line-echart>
                </my-card>
            </el-col>
            <el-col :span="12">
                <my-card title="分类商品收藏">
                    <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
                </my-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";
import MyCard from "@/base-ui/card";
import { PieEchart, RoseEchart, LineEchart, BarEchart, MapEchart } from "@/components/page-echart";

export default defineComponent({
    name: "dashboard",
    components: {
        MyCard,
        PieEchart,
        RoseEchart,
        LineEchart,
        BarEchart,
        MapEchart
    },
    setup() {
        //请求数据
        const store = useStore();
        store.dispatch("dashboard/getDashboardDataAction");
        // 获取数据
        //饼图玫瑰图数据
        const categoryGoodsCount = computed(() => {
            return store.state.dashboard.categoryGoodsCount.map((item: any) => {
                return { name: item.name, value: item.goodsCount };
            });
        });
        //折线图数据
        const categoryGoodsSale = computed(() => {
            const xLabels: string[] = [];
            const values: any[] = [];
            const categoryGoodsSale = store.state.dashboard.categoryGoodsSale;
            for (const item of categoryGoodsSale) {
                xLabels.push(item.name);
                values.push(item.goodsCount);
            }
            return { xLabels, values };
        });
        //柱状图数据
        const categoryGoodsFavor = computed(() => {
            const xLabels: string[] = [];
            const values: any[] = [];
            const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor;
            for (const item of categoryGoodsFavor) {
                xLabels.push(item.name);
                values.push(item.goodsFavor);
            }
            return { xLabels, values };
        });
        //地图数据
        const mapData = computed(() => {
            return store.state.dashboard.addressGoodsSales.map((item) => {
                return {
                    name: item.address,
                    value: item.count
                };
            });
        });
        return {
            categoryGoodsCount,
            categoryGoodsSale,
            categoryGoodsFavor,
            mapData
        };
    }
});
</script>

<style lang="scss" scoped>
.content-row {
    margin-top: 20px !important;
}
</style>
