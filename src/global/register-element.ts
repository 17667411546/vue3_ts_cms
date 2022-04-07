import { App } from "vue";
import "element-plus/lib/theme-chalk/base.css";
import "element-plus/lib/theme-chalk/el-alert.css";
import {
    ElButton,
    ElTabs,
    ElTabPane,
    ElForm,
    ElFormItem,
    ElInput,
    ElCheckbox,
    ElLink,
    ElMenu,
    ElMenuItem,
    ElSubmenu,
    ElContainer,
    ElAside,
    ElHeader,
    ElMain,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElAvatar,
    ElButtonGroup,
    ElCol,
    ElRow,
    ElSelect,
    ElOption,
    ElDatePicker,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElConfigProvider,
    ElDialog,
    ElImage,
    ElTree,
    ElDescriptions,
    ElDescriptionsItem,
    ElTag,
    ElCard,
    ElTooltip,
    ElMessageBox
} from "element-plus";

const components = [
    ElButton,
    ElTabs,
    ElTabPane,
    ElForm,
    ElFormItem,
    ElInput,
    ElCheckbox,
    ElLink,
    ElMenu,
    ElMenuItem,
    ElSubmenu,
    ElContainer,
    ElAside,
    ElHeader,
    ElMain,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElAvatar,
    ElButtonGroup,
    ElCol,
    ElRow,
    ElSelect,
    ElOption,
    ElDatePicker,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElConfigProvider,
    ElDialog,
    ElImage,
    ElTree,
    ElDescriptions,
    ElDescriptionsItem,
    ElTag,
    ElCard,
    ElTooltip,
    ElMessageBox
];
export default function (app: App): void {
    for (const cpn of components) {
        app.component(cpn.name, cpn);
    }
}