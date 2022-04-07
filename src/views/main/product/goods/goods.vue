<template>
    <div class="goods">
        <page-search :searchFormConfig="searchFormConfig"></page-search>
        <page-content :contentTableConfig="contentTableConfig" pageName="goods">
            <template #image="scope">
                <el-image
                    style="width: 60px; height: 60px"
                    :src="scope.row.imgUrl"
                    :preview-src-list="[scope.row.imgUrl]"
                ></el-image>
            </template>
            <template #oldPrice="scope">
                <span>{{ "￥" + scope.row.oldPrice }}</span>
            </template>
            <template #status="scope">
                <el-button plain size="mini" :type="scope.row.status ? 'success' : 'danger'">
                    {{ scope.row.status ? "启用" : "禁用" }}
                </el-button>
            </template>
        </page-content>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import { contentTableConfig } from "./config/content.config";
import { searchFormConfig } from "./config/search.config";

export default defineComponent({
    name: "goods",
    components: {
        PageSearch,
        PageContent
    },
    setup() {
        return {
            contentTableConfig,
            searchFormConfig
        };
    }
});
</script>

<style scoped></style>
