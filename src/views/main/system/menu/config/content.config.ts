const propsList = [
    { prop: "name", label: "菜单名称", minWidth: "100" },
    { prop: "type", label: "类型", minWidth: "60" },
    { prop: "url", label: "菜单url", minWidth: "100" },
    { prop: "icon", label: "菜单icon", minWidth: "100" },
    { prop: "permission", label: "按钮权限 ", minWidth: "100" },
    { prop: "createAt", label: "创建时间", minWidth: "200", slotName: "createAt" },
    { prop: "updateAt", label: "修改时间", minWidth: "200", slotName: "updateAt" },
    { label: "操作", minWidth: "160", slotName: "handler" }
];
export const contentTableConfig = {
    propsList,
    title: "菜单列表",
    //序号
    showIndexColumn: false,
    //可选中列
    showSelectColumn: false,
    //展开表格
    childrenProps: {
        rowKey: "id",
        treeProps: {
            children: "children"
        }
    },
    //是否显示分页
    showFooter: false
};
