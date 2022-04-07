<template>
    <div class="my-table">
        <div class="header">
            <slot name="header">
                <div class="title">{{ title }}</div>
                <div class="handler">
                    <slot name="header-handler"></slot>
                </div>
            </slot>
        </div>
        <el-table
            :data="listData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
            v-bind="childrenProps"
        >
            <el-table-column
                v-if="showSelectColumn"
                type="selection"
                align="center"
                width="60"
            ></el-table-column>
            <el-table-column
                v-if="showIndexColumn"
                type="index"
                label="序号"
                align="center"
                width="80"
            ></el-table-column>
            <template v-for="propsItem in propsList" :key="propsItem.prop">
                <el-table-column v-bind="propsItem" align="center" show-overflow-tooltip>
                    <template #default="scope">
                        <slot :name="propsItem.slotName" :row="scope.row">
                            {{ scope.row[propsItem.prop] }}
                        </slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <div class="footer" v-if="showFooter">
            <slot name="footer">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.currentPage"
                    layout="total,sizes,prev,pager,next,jumper"
                    :page-sizes="[10, 20, 30, 40, 50]"
                    :total="listCount"
                    :page-size="page.pageSize"
                ></el-pagination>
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "myTable",
    props: {
        title: {
            type: String,
            default: ""
        },
        listData: {
            type: Array,
            required: true
        },
        listCount: {
            type: Number,
            default: 0
        },
        propsList: {
            type: Array,
            required: true
        },
        showIndexColumn: {
            type: Boolean,
            default: false
        },
        showSelectColumn: {
            type: Boolean,
            default: false
        },
        page: {
            type: Object,
            default: () => ({ currentPage: 1, pageSize: 10 })
        },
        childrenProps: {
            type: Object,
            default: () => ({})
        },
        showFooter: {
            type: Boolean,
            default: true
        }
    },
    emits: ["selectionChange", "update:page"],
    setup(props, { emit }) {
        const handleSelectionChange = (event: any) => {
            emit("selectionChange", event);
        };
        const handleSizeChange = (pageSize: number) => {
            emit("update:page", { ...props.page, pageSize });
        };
        const handleCurrentChange = (currentPage: number) => {
            emit("update:page", { ...props.page, currentPage });
        };
        return {
            handleSelectionChange,
            handleCurrentChange,
            handleSizeChange
        };
    }
});
</script>

<style scoped lang="scss">
.header {
    display: flex;
    height: 60px;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;

    .title {
        font-size: 20px;
        font-weight: 700;
    }

    .handler {
        align-items: center;
    }
}

.footer {
    margin-top: 15px;

    .el-pagination {
        text-align: right;
    }
}
</style>
