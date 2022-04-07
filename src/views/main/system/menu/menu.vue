<template>
    <div class="menu">
        <page-content :contentTableConfig="contentTableConfig" pageName="menu"></page-content>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { contentTableConfig } from "./config/content.config";
import PageContent from "@/components/page-content";
export default defineComponent({
    name: "my-menu",
    components: {
        PageContent
    },
    setup() {
        return {
            contentTableConfig
        };
    }
});
</script>

<style scoped></style>
