<template>
    <div class="my-form">
        <div class="header">
            <slot name="header"></slot>
        </div>
        <el-form :label-width="labelWidth" :model="modelValue" ref="formRef">
            <el-row>
                <template v-for="item in formItems" :key="item.label">
                    <el-col :span="8" v-bind="colLayout">
                        <el-form-item
                            v-if="!item.isHidden"
                            :label="item.label"
                            :style="itemStyle"
                            :rules="item.rules"
                            show-message
                            :prop="item.field"
                        >
                            <template v-if="item.type === 'input' || item.type === 'password'">
                                <el-input
                                    :placeholder="item.placeholder"
                                    :clearable="item.clearable"
                                    :show-password="item.type === 'password'"
                                    v-bind="item.otherOptions"
                                    :model-value="modelValue[`${item.field}`]"
                                    @update:modelValue="handleValueChange($event, item.field)"
                                />
                                <!-- v-model="formData[`${item.field}`]" -->
                            </template>
                            <template v-else-if="item.type === 'select'">
                                <!-- v-model="formData[`${item.field}`]" -->
                                <el-select
                                    :placeholder="item.placeholder"
                                    :clearable="item.clearable"
                                    v-bind="item.otherOptions"
                                    :model-value="modelValue[`${item.field}`]"
                                    @update:modelValue="handleValueChange($event, item.field)"
                                    style="width: 100%"
                                >
                                    <el-option
                                        v-for="option in item.options"
                                        :key="option.value"
                                        :value="option.value"
                                    >
                                        {{ option.title }}
                                    </el-option>
                                </el-select>
                            </template>
                            <template v-else-if="item.type === 'datepicker'">
                                <!-- v-model="formData[`${item.field}`]" -->
                                <el-date-picker
                                    v-bind="item.otherOptions"
                                    :clearable="item.clearable"
                                    :model-value="modelValue[`${item.field}`]"
                                    @update:modelValue="handleValueChange($event, item.field)"
                                    style="width: 100%"
                                ></el-date-picker>
                            </template>
                        </el-form-item>
                    </el-col>
                </template>
            </el-row>
        </el-form>
        <div class="footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { ElForm } from "element-plus"; //拿到类型
import { IFormItem } from "../types";

export default defineComponent({
    name: "MyForm",
    props: {
        modelValue: {
            type: Object,
            require: true
        },
        formItems: {
            type: Array as PropType<IFormItem[]>,
            default: () => []
        },
        labelWidth: {
            type: String,
            default: "100px"
        },
        itemStyle: {
            type: Object,
            default: () => ({ padding: "10px 20px" })
        },
        colLayout: {
            type: Object,
            default: () => ({
                xl: 6, //>=1920px 4个
                lg: 8,
                md: 12,
                sm: 24,
                xs: 24
            })
        }
    },
    emits: ["update:modelValue", "getValid"],
    setup(props, { emit }) {
        //1. 通过v-model 绑定每个form-item 的值 保证单项数据流 不能直接修改父组件传过来的值
        // const formData = ref({ ...props.modelValue });
        // watch(
        //     formData,
        //     (newValue) => {
        //         emit("update:modelValue", newValue);
        //     },
        //     { deep: true }
        // );
        // return {
        //     formData
        // };
        //
        //2. 通过:model-value 设置form-item 的值
        const handleValueChange = (event: any, field: string) => {
            emit("update:modelValue", { ...props.modelValue, [field]: event });
        };
        //表单验证
        const formRef = ref<InstanceType<typeof ElForm>>();
        const validate = () => {
            let flag = null;
            formRef.value?.validate((valid) => {
                flag = valid;
            });
            return flag;
        };
        return {
            handleValueChange,
            validate,
            formRef
        };
    }
});
</script>

<style scoped lang="scss">
.my-form {
    padding-top: 22px;
}
</style>
