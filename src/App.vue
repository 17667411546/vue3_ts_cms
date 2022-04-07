<template>
    <div class="app">
        <el-config-provider :locale="zhCn">
            <router-view></router-view>
        </el-config-provider>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
export default defineComponent({
    name: "App",
    components: {
        ElConfigProvider
    },
    setup() {
        return { zhCn };
    }
});
</script>
<style lang="sass">
.app
    height: 100%
// 关键css代码 element-plus table 表头对齐
.el-table__header col[name="gutter"]
    display: table-cell !important
</style>
