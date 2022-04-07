<template>
    <div class="page-content">
        <my-table
            :listData="dataList"
            :listCount="dataCount"
            v-bind="contentTableConfig"
            @selectionChange="handleSelectionChange"
            v-model:page="pageInfo"
        >
            <!-- header中的插槽 -->
            <template #header-handler>
                <el-button type="primary" size="medium" v-if="isCreate" @click="hanleNewClick">
                    {{ createName }}
                </el-button>
            </template>
            <!-- table 固定的每列的插槽 -->
            <template #createAt="scope">
                <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
            </template>
            <template #updateAt="scope">
                <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
            </template>
            <template #handler="scope">
                <div class="handle-btns">
                    <el-button
                        icon="el-icon-edit"
                        size="mini"
                        type="text"
                        v-if="isUpdate"
                        @click="hanleEditClick(scope.row)"
                    >
                        编辑
                    </el-button>
                    <el-button
                        icon="el-icon-delete"
                        size="mini"
                        type="text"
                        v-if="isDelete"
                        @click="hanleDeleteClick(scope.row)"
                    >
                        删除
                    </el-button>
                </div>
            </template>
            <!-- 动态插入剩余的插槽 -->
            <template v-for="item in otherPropsSlots" :key="item.prop" #[item.slotName]="scope">
                <slot :name="item.slotName" :row="scope.row"></slot>
            </template>
        </my-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { ElMessageBox } from "element-plus";
import { useStore } from "@/store";
import MyTable from "@/base-ui/table";
import { usePermission } from "@/hooks/usePermission";

export default defineComponent({
    components: {
        MyTable
    },
    props: {
        contentTableConfig: {
            type: Object,
            required: true
        },
        pageName: {
            type: String,
            required: true
        },
        createName: {
            type: String,
            default: "新建用户"
        }
    },
    emits: ["newBtnClick", "editBtnClick"],
    setup(props, { emit }) {
        const store = useStore();
        //获取操作的权限
        const isCreate = usePermission(props.pageName, "create");
        const isUpdate = usePermission(props.pageName, "update");
        const isDelete = usePermission(props.pageName, "delete");
        const isQuery = usePermission(props.pageName, "query");

        //分页绑定数据 pageInfo
        const pageInfo = ref({ currentPage: 1, pageSize: 10 });
        //监听pageInfo 发送网络请求
        watch(
            () => {
                return pageInfo.value;
            },
            () => {
                getDatePage();
            },
            { deep: true }
        );
        //发送网络请求
        const getDatePage = (queryInfo: any = {}) => {
            //有权限时候在发送请求
            if (!isQuery) return;
            store.dispatch("system/getPageListAction", {
                pageName: props.pageName,
                queryInfo: {
                    offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
                    size: pageInfo.value.pageSize,
                    ...queryInfo
                }
            });
        };
        getDatePage();
        //从vuex中获取数据
        const dataList = computed(() => store.getters[`system/pageListData`](props.pageName));
        const dataCount = computed(() => store.getters[`system/pageListCount`](props.pageName));
        // const userCount = computed(() => store.getters());
        //选中回调事件
        const handleSelectionChange = (event: any) => {
            console.log(event);
        };
        //4. 获取其他的动态插槽名称
        //排除固定插槽名称
        const fixedSlotNames = ["createAt", "updateAt", "handler"];

        const otherPropsSlots = props.contentTableConfig?.propsList.filter((item: any) => {
            if (fixedSlotNames.includes(item.slotName)) {
                return false;
            }
            return item.slotName;
        });
        //新建
        const hanleNewClick = () => {
            emit("newBtnClick");
        };
        //编辑
        const hanleEditClick = (row: any) => {
            emit("editBtnClick", row);
        };
        //删除
        const hanleDeleteClick = (item: any) => {
            ElMessageBox.confirm("确定删除吗？")
                .then(() => {
                    store.dispatch("system/deletePageDataAction", {
                        pageName: props.pageName,
                        id: item.id
                    });
                })
                .catch(() => {
                    // catch error
                });
        };
        return {
            dataList,
            pageInfo,
            dataCount,
            handleSelectionChange,
            getDatePage,
            otherPropsSlots,
            isCreate,
            isUpdate,
            isDelete,
            hanleDeleteClick,
            hanleNewClick,
            hanleEditClick
        };
    }
});
</script>

<style scoped>
.page-content {
    padding: 20px;
    border-top: 20px solid #f5f5f5;
}
</style>
