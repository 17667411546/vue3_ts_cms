import { IForm } from "@/base-ui/form";

// const labelWidth = "120px";
// const itemStyle = {
//     padding: "10px 40px"
// };
export const searchFormConfig: IForm = {
    labelWidth: "120px",
    colLayout: {
        span: 8
    },
    itemStyle: {
        padding: "10px 40px"
    },
    formItems: [
        {
            field: "id",
            label: "id",
            type: "input",
            placeholder: "请输入id",
            clearable: true
        },
        {
            field: "name",
            label: "用户名",
            type: "input",
            placeholder: "请输入用户名"
        },
        {
            field: "realname",
            label: "真实姓名",
            type: "input",
            placeholder: "请输入真实姓名",
            clearable: true
        },
        {
            field: "cellphone",
            label: "电话号码",
            type: "input",
            placeholder: "请选择电话号码",
            clearable: true
        },
        {
            field: "enable",
            label: "用户状态",
            type: "select",
            placeholder: "请选择用户状态",
            clearable: true,
            options: [
                {
                    title: "启用",
                    value: "启用"
                },
                {
                    title: "禁用",
                    value: "禁用"
                }
            ]
        },
        {
            field: "createAt",
            label: "创建时间",
            type: "datepicker",
            placeholder: "请选择创建时间范围",
            clearable: true,
            otherOptions: {
                startPlaceholder: "开始时间",
                endPlaceholder: "结束时间",
                type: "daterange"
                // size: "small"
            }
        }
    ]
};
