<template>
    <div class="role">
        <page-search :searchFormConfig="searchFormConfig"></page-search>
        <page-content
            :contentTableConfig="contentTableConfig"
            pageName="role"
            createName="新增角色"
            @newBtnClick="handleNewData(promptTitle.create)"
            @editBtnClick="handleEditData($event, promptTitle.edit)"
        ></page-content>
        <page-modal
            :modalConfig="modalConfig"
            :defaultInfo="defaultInfo"
            :promptTitle="promptTitle"
            ref="pageModalRef"
            pageName="role"
            :otherInfo="otherInfo"
        >
            <div class="menu-tree">
                <el-tree
                    ref="elTreeRef"
                    :data="treeData"
                    show-checkbox
                    node-key="id"
                    :props="{ children: 'children', label: 'name' }"
                    @check="handleCheck"
                >
                </el-tree>
            </div>
        </page-modal>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from "vue";
import { ElTree } from "element-plus";
import { contentTableConfig } from "./config/content.config";
import { searchFormConfig } from "./config/search.config";
import { modalConfig } from "./config/modal.config";
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";
import { usePageModal } from "@/hooks/usePageModal";
import { useStore } from "@/store";
import { menuMapLeafKeys } from "@/utils/map-menus";

export default defineComponent({
    name: "role",
    components: {
        PageSearch,
        PageContent,
        PageModal
    },
    setup() {
        const promptTitle = {
            create: "新建角色",
            edit: "编辑角色"
        };
        //获取树数据
        const store = useStore();
        const treeData = computed(() => store.state.entireMenuTree);
        //选中的树状数据
        const otherInfo = ref({});
        const handleCheck = (data1: any, data2: any) => {
            const { checkedKeys, halfCheckedKeys } = data2;
            const menuList = [...checkedKeys, ...halfCheckedKeys];
            otherInfo.value = { menuList };
        };
        const elTreeRef = ref<InstanceType<typeof ElTree>>();
        //处理pageModal hook
        const editCallback = (item: any) => {
            const leafKeys = menuMapLeafKeys(item.menuList);
            nextTick(() => {
                elTreeRef.value?.setCheckedKeys(leafKeys, false);
            });
        };
        const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
            undefined,
            editCallback
        );
        return {
            searchFormConfig,
            contentTableConfig,
            modalConfig,
            pageModalRef,
            defaultInfo,
            handleNewData,
            handleEditData,
            promptTitle,
            treeData,
            otherInfo,
            elTreeRef,
            handleCheck
        };
    }
});
</script>

<style lang="scss" scoped>
.menu-tree {
    margin-left: 25px;
}
</style>
