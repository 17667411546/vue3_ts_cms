import { IForm } from "@/base-ui/form";

export const modalConfig: IForm = {
    formItems: [
        {
            field: "name",
            type: "input",
            label: "角色名",
            placeholder: "请输入角色名",
            rules: [
                {
                    required: true,
                    message: "必须输入角色名",
                    trigger: "blur"
                },
                {
                    pattern: /^[a-z0-9]{6,20}$/,
                    message: "必须是6-20个字母或数字",
                    trigger: "blur"
                }
            ]
        },
        {
            field: "intro",
            type: "input",
            label: "角色介绍",
            placeholder: "请输入角色介绍"
        }
    ],
    colLayout: {
        span: 24
    },
    itemStyle: {}
};
