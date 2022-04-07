<template>
    <div class="user">
        <page-search
            :searchFormConfig="searchFormConfig"
            @resetBtnClick="handleResetClick"
            @queryBtnClick="handleQueryClick"
        />
        <page-content
            :contentTableConfig="contentTableConfig"
            pageName="users"
            ref="pageContentRef"
            @newBtnClick="handleNewBtnData"
            @editBtnClick="handleEditBtnData"
        >
            <template #status="scope">
                <el-button plain size="mini" :type="scope.row.enable ? 'success' : 'danger'">
                    {{ scope.row.enable ? "启用" : "禁用" }}
                </el-button>
            </template>
        </page-content>
        <page-modal
            :modalConfig="modalConfigRef"
            :defaultInfo="defaultInfo"
            ref="pageModalRef"
            pageName="users"
        ></page-modal>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";
import { usePageSearch } from "@/hooks/userPageSearch";
import PageModal from "@/components/page-modal";
import { usePageModal } from "@/hooks/usePageModal";

export default defineComponent({
    components: {
        PageSearch,
        PageContent,
        PageModal
    },
    name: "users",
    setup() {
        // const propsList = [
        //     { prop: "name", label: "用户名", minWidth: "100" },
        //     { prop: "realname", label: "真实名", minWidth: "100" },
        //     { prop: "cellphone", label: "手机号码", minWidth: "100" },
        //     { prop: "enable", label: "状态", minWidth: "100", slotName: "status" },
        //     { prop: "createAt", label: "创建时间", minWidth: "250", slotName: "createAt" },
        //     { prop: "updateAt", label: "修改时间", minWidth: "250", slotName: "updateAt" },
        //     { label: "操作", minWidth: "160", slotName: "handler" }
        // ];
        //pageContent hooks推荐这种写法
        const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch();
        //pageModal hooks
        //处理密码逻辑
        const newCallback = () => {
            const passwordItem = modalConfig.formItems.find((item) => item.field === "password");
            passwordItem!.isHidden = false;
        };
        const editCallback = () => {
            const passwordItem = modalConfig.formItems.find((item) => item.field === "password");
            passwordItem!.isHidden = true;
        };
        const modalConfigRef = computed(() => {
            // 动态添加部门和角色列表
            const store = useStore();
            const departmentItem = modalConfig.formItems.find((item) => {
                return item.field == "departmentId";
            });

            departmentItem!.options = store.state.entireDepartment.map((item) => {
                return {
                    value: item.id,
                    title: item.name,
                    id: item.id
                };
            });
            const roleItem = modalConfig.formItems.find((item) => {
                return item.field == "roleId";
            });

            roleItem!.options = store.state.entireRole.map((item) => {
                return {
                    value: item.id,
                    title: item.name,
                    id: item.id
                };
            });
            return modalConfig;
        });

        const [pageModalRef, defaultInfo, handleNewBtnData, handleEditBtnData] = usePageModal(
            newCallback,
            editCallback
        );
        return {
            searchFormConfig,
            contentTableConfig,
            pageContentRef,
            handleResetClick,
            handleQueryClick,
            modalConfigRef,
            handleNewBtnData,
            handleEditBtnData,
            pageModalRef,
            defaultInfo
            //阅读性较差
            //...usePageSearch()
        };
    }
});
</script>

<style scoped></style>
