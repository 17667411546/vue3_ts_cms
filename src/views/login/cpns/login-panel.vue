<template>
    <div class="login-panel">
        <h1 class="title">我的后台管理系统</h1>
        <el-tabs type="border-card" v-model="currentTab" stretch>
            <el-tab-pane name="account">
                <template #label>
                    <span><i class="el-icon-user-solid"></i> 账号登录</span>
                </template>
                <login-account ref="accountRef" />
            </el-tab-pane>
            <el-tab-pane name="phone">
                <template #label>
                    <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
                </template>
                <login-phone ref="phoneRef" />
            </el-tab-pane>
        </el-tabs>
        <div class="control-account">
            <el-checkbox v-model="isKeep">记住密码</el-checkbox>
            <el-link type="primary">忘记密码</el-link>
        </div>
        <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登录</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LoginAccount from "./login-account.vue";
import LoginPhone from "./login-phone.vue";
export default defineComponent({
    components: {
        LoginAccount,
        LoginPhone
    },
    setup() {
        const currentTab = ref("account");
        const isKeep = ref(false);
        const accountRef = ref<InstanceType<typeof LoginAccount>>();
        const phoneRef = ref<InstanceType<typeof LoginPhone>>();
        const handleLoginClick = () => {
            if (currentTab.value === "account") {
                accountRef.value?.loginAction(isKeep.value);
            } else {
                phoneRef.value?.loginAction();
            }
        };
        return {
            currentTab,
            isKeep,
            accountRef,
            phoneRef,
            handleLoginClick
        };
    }
});
</script>

<style lang="scss" scoped>
.login-panel {
    width: 330px;
    margin-bottom: 150px;

    .title {
        text-align: center;
    }

    .control-account {
        margin-top: 12px;
        display: flex;

        justify-content: space-between;
    }

    .login-btn {
        margin-top: 10px;
        width: 100%;
    }
}
</style>
