<template>
    <el-form :model="account" label-width="60px" ref="formRef" :rules="accountRules">
        <el-form-item label="账号" prop="name">
            <el-input v-model="account.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="account.password" show-password />
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { useStore } from "vuex";
import { ElForm } from "element-plus"; //拿到类型
import { accountRules } from "../config/account.config";
// import { Account } from "../types";
import localCache from "@/utils/cache";
// import { useStore } from "@/store/index";

export default defineComponent({
    setup() {
        const store = useStore();
        const formRef = ref<InstanceType<typeof ElForm>>();

        const account = reactive({
            name: localCache.getCache("name") ?? "",
            password: localCache.getCache("password") ?? ""
        });
        const loginAction = (isKeep: boolean) => {
            formRef.value?.validate((valid) => {
                if (valid) {
                    //2.登录逻辑
                    store.dispatch("login/accountLoginAction", { ...account });
                    //1.是否记住密码
                    if (isKeep) {
                        //本地缓存
                        localCache.setCache("name", account.name);
                        localCache.setCache("password", account.password);
                    } else {
                        localCache.deleteCache("name");
                        localCache.deleteCache("password");
                    }
                }
            });
        };
        return {
            formRef,
            account,
            accountRules,
            loginAction
        };
    }
});
</script>

<style scoped></style>
