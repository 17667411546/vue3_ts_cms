<template>
    <div>
        <el-breadcrumb>
            <template v-for="item in breadcrumbs" :key="item.name">
                <el-breadcrumb-item :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
            </template>
        </el-breadcrumb>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { IBreadcrumb } from "../types";
export default defineComponent({
    props: {
        breadcrumbs: {
            type: Array as PropType<IBreadcrumb[]>
        }
    },
    setup() {
        return {};
    }
});
</script>

<style scoped></style>
