export const accountRules = {
    name: [
        {
            required: true,
            message: "必须输入用户名",
            trigger: "blur"
        },
        {
            pattern: /^[a-z0-9]{6,10}$/,
            message: "必须是6-20个字母或数字",
            trigger: "blur"
        }
    ],
    password: [
        {
            required: true,
            message: "必须输入密码",
            trigger: "blur"
        },
        {
            pattern: /^[a-z0-9]{3,}$/,
            message: "必须是3位以上字母或数字",
            trigger: "blur"
        }
    ]
};
