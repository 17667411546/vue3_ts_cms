<template>
    <div class="user-info">
        <el-dropdown>
            <span class="el-dropdown-link">
                <img src="~@/assets/img/1.webp" />
                <span>{{ name }}</span>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item icon="el-icon-circle-close" @click="handleExitClick">
                        退出登录
                    </el-dropdown-item>
                    <el-dropdown-item divided>用户信息</el-dropdown-item>
                    <el-dropdown-item>系统管理</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import localCache from "@/utils/cache";

export default defineComponent({
    setup() {
        const store = useStore();
        const name = computed(() => store.state.login.userInfo.name);

        const router = useRouter();
        const handleExitClick = () => {
            localCache.deleteCache("token");
            localCache.deleteCache("userInfo");
            router.push("/main");
        };

        return {
            name,
            handleExitClick
        };
    }
});
</script>

<style lang="scss" scoped>
.el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        object-fit: contain;
    }
    span {
        margin-left: 10px;
    }
}
</style>
