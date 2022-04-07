<template>
    <el-form label-width="65px" :rules="phoneRules" :model="phone" ref="phoneRef">
        <el-form-item label="手机号" prop="num">
            <el-input v-model="phone.num" />
        </el-form-item>
        <el-form-item label="验证码" prop="code">
            <div class="verify-code">
                <el-input v-model="phone.code" />
                <el-button class="get-btn" type="primary">获取验证码</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { ElForm } from "element-plus";
import { phoneRules } from "../config/phone.config";
export default defineComponent({
    setup() {
        const phoneRef = ref<InstanceType<typeof ElForm>>();
        const store = useStore();
        const phone = reactive({
            num: "",
            code: ""
        });
        const loginAction = () => {
            phoneRef.value?.validate((valid) => {
                console.log("验证", valid);
                if (valid) {
                    //1.是否记住密码
                    // if (isKeep) {
                    //     //本地缓存
                    //     localCache.setCache("name", account.name);
                    //     localCache.setCache("password", account.password);
                    // } else {
                    //     localCache.deleteCache("name");
                    //     localCache.deleteCache("password");
                    // }
                    //2.登录逻辑
                    store.dispatch("login/phoneLoginAction", { ...phone });
                }
            });
        };
        return {
            phone,
            phoneRules,
            phoneRef,
            loginAction
        };
    }
});
</script>

<style scoped lang="scss">
.verify-code {
    display: flex;

    .get-btn {
        margin-left: 8px;
    }
}
</style>
