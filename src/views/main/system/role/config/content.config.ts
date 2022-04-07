const propsList = [
    { prop: "name", label: "角色名", minWidth: "100" },
    { prop: "intro", label: "权限介绍", minWidth: "100" },
    { prop: "createAt", label: "创建时间", minWidth: "250", slotName: "createAt" },
    { prop: "updateAt", label: "修改时间", minWidth: "250", slotName: "updateAt" },
    { label: "操作", minWidth: "160", slotName: "handler" }
];
export const contentTableConfig = {
    propsList,
    title: "用户列表",
    //序号
    showIndexColumn: true,
    //可选中列
    showSelectColumn: true
};
