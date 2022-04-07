<template>
    <div class="page-modal">
        <el-dialog :title="title" v-model="dialogVisible" width="35%" center destroy-on-close>
            <my-from v-bind="modalConfig" v-model="formData" ref="formRef"></my-from>
            <slot></slot>
            <template #footer>
                <span>
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleConfirm">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useStore } from "@/store";
import MyFrom from "@/base-ui/form";

export default defineComponent({
    components: {
        MyFrom
    },
    props: {
        modalConfig: {
            type: Object,
            required: true
        },
        defaultInfo: {
            type: Object,
            default: () => ({})
        },
        pageName: {
            type: String,
            default: ""
        },
        otherInfo: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props) {
        const dialogVisible = ref(false);
        //标题
        const title = ref("");
        const formData = ref<any>({});
        watch(
            () => props.defaultInfo,
            (newValue) => {
                for (const item of props.modalConfig.formItems) {
                    formData.value[`${item.field}`] = newValue[`${item.field}`];
                }
            }
        );
        const store = useStore();
        //点击确定
        const formRef = ref<InstanceType<typeof MyFrom>>();
        const handleConfirm = () => {
            if (formRef.value && formRef.value.validate()) {
                dialogVisible.value = false;
                if (Object.keys(props.defaultInfo).length) {
                    //编辑
                    store.dispatch("system/editPageDataAction", {
                        pageName: props.pageName,
                        editData: { ...formData.value, ...props.otherInfo },
                        id: props.defaultInfo.id
                    });
                } else {
                    //新建
                    store.dispatch("system/createPageDataAction", {
                        pageName: props.pageName,
                        newData: { ...formData.value, ...props.otherInfo }
                    });
                }
            }
        };
        return {
            dialogVisible,
            handleConfirm,
            formData,
            formRef,
            title
        };
    }
});
</script>

<style scoped></style>
