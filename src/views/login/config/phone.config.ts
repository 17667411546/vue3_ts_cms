export const phoneRules = {
    num: [
        {
            required: true,
            message: "必须输入手机号",
            trigger: "blur"
        },
        {
            pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
        }
    ],
    code: [
        {
            required: true,
            message: "必须输入验证码",
            trigger: "blur"
        },
        {
            pattern: /^\d{4}$/,
            message: "必须是4位字母或数字",
            trigger: "blur"
        }
    ]
};
