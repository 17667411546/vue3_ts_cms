import { IFormItem, IForm } from "@/base-ui/form";

const formItems: IFormItem[] = [
    {
        field: "name",
        label: "角色名称",
        type: "input",
        placeholder: "请输入角色名称"
    },
    {
        field: "intro",
        label: "权限介绍",
        type: "input",
        placeholder: "请输入权限介绍"
    },
    {
        field: "createTime",
        label: "创建时间",
        type: "datepicker",
        placeholder: "请选择创建时间范围",
        otherOptions: {
            startPlaceholder: "开始时间",
            endPlaceholder: "结束时间",
            type: "daterange"
            // size: "small"
        }
    }
];
export const searchFormConfig: IForm = {
    labelWidth: "120px",
    formItems
};
