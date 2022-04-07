<template>
    <div class="nav-header">
        <i
            class="fold-menu"
            :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
            @click="handleFoldClick"
        ></i>
        <div class="content">
            <my-breadcrumb :breadcrumbs="breadcrumbs"></my-breadcrumb>
            <user-info></user-info>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRoute } from "vue-router";
import UserInfo from "./user-info.vue";
import { useStore } from "@/store";
import MyBreadcrumb from "@/base-ui/breadcrumb";
import { pathMapBreadcrumb } from "@/utils/map-menus";
export default defineComponent({
    components: {
        UserInfo,
        MyBreadcrumb
    },
    emits: ["foldChange"],
    setup(props, { emit }) {
        const isFold = ref(false);
        const handleFoldClick = () => {
            isFold.value = !isFold.value;
            emit("foldChange", isFold.value);
        };

        //面包屑数据 [{name: "", path: ""}]
        // eslint-disable-next-line vue/return-in-computed-property
        const breadcrumbs = computed(() => {
            const userMenus = useStore().state.login.userMenus;
            const currentPath = useRoute().path;
            return pathMapBreadcrumb(userMenus, currentPath);
        });
        return {
            isFold,
            handleFoldClick,
            breadcrumbs
        };
    }
});
</script>

<style lang="scss" scoped>
.nav-header {
    display: flex;
    width: 100%;

    .fold-menu {
        font-size: 30px;
        cursor: pointer;
    }

    .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        padding: 0 20px;
    }
}
</style>
