<template>
    <div class="page-search">
        <my-form v-bind="searchFormConfig" v-model="formData">
            <template #header>
                <!-- <h1>高级插槽</h1> -->
            </template>
            <template #footer>
                <div class="handle-btns">
                    <el-button icon="el-icon-refresh" @click="handleResetClick">重置</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="handleQueryClick"
                        >搜索</el-button
                    >
                </div>
            </template>
        </my-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MyForm from "@/base-ui/form";
export default defineComponent({
    components: {
        MyForm
    },
    props: {
        searchFormConfig: {
            type: Object,
            required: true
        }
    },
    emits: ["resetBtnClick", "queryBtnClick"],
    setup(props, { emit }) {
        //双向绑定的数据由配置文件field决定
        //1.优化一 formData中的属性应该由动态决定
        const formItems = props.searchFormConfig?.formItems ?? [];
        const formOriginData: any = {};
        for (const item of formItems) {
            formOriginData[item.field] = "";
        }
        const formData = ref(formOriginData);
        //重置
        //2.点击重置
        const handleResetClick = () => {
            //1. v-model绑定值处理数据 不能直接把 formData.value设置为{} 子组件通过{...props.moduleValue}解构获取的数据
            //需要循环遍历修改每一个对应的key值
            // for (const key in formOriginData) {
            //     formData.value[`${key}`] = formOriginData[key];
            // }
            //2.通过el-form组件的module-value赋值 可直接修改formData的值
            formData.value = formOriginData;
            emit("resetBtnClick");
        };
        //3. 优化3 搜索实现
        const handleQueryClick = () => {
            let realFormData = { ...formData.value };
            if (realFormData.enable) {
                realFormData.enable = realFormData.enable === "启用" ? 1 : 0;
            }
            console.log(realFormData);

            emit("queryBtnClick", realFormData);
        };
        return {
            formData,
            handleResetClick,
            handleQueryClick
        };
    }
});
</script>

<style scoped>
.header {
    color: red;
}
.handle-btns {
    text-align: right;
    padding: 0 50px 20px 0;
}
</style>
