const propsList = [
    { prop: "name", label: "用户名", minWidth: "100" },
    { prop: "realname", label: "真实名", minWidth: "100" },
    { prop: "cellphone", label: "手机号码", minWidth: "100" },
    { prop: "enable", label: "状态", minWidth: "100", slotName: "status" },
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
