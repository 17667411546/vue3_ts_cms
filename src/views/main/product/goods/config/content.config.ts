const propsList = [
    { prop: "name", label: "商品名称", minWidth: "150" },
    { prop: "oldPrice", label: "原价格", minWidth: "80", slotName: "oldPrice" },
    { prop: "newPrice", label: "现价格", minWidth: "80" },
    { prop: "imgUrl", label: "商品图片", minWidth: "100", slotName: "image" },
    { prop: "status", label: "状态", minWidth: "100", slotName: "status" },
    { prop: "createAt", label: "创建时间", minWidth: "250", slotName: "createAt" },
    { prop: "updateAt", label: "修改时间", minWidth: "250", slotName: "updateAt" },
    { label: "操作", minWidth: "160", slotName: "handler" }
];
export const contentTableConfig = {
    propsList,
    title: "商品列表",
    //序号
    showIndexColumn: true,
    //可选中列
    showSelectColumn: true
};
