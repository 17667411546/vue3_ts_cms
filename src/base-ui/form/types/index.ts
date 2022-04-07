type IformType = "input" | "password" | "select" | "datepicker";
export interface IFormItem {
    field: string;
    type: IformType;
    label: string;
    clearable?: boolean;
    placeholder?: any;
    rules?: any[];
    //针对select组件
    options?: any[];
    //针对特殊的组件属性
    otherOptions?: any;
    isHidden?: boolean;
}
export interface IForm {
    formItems: IFormItem[];
    labelWidth?: string;
    rules?: any;
    colLayout?: any;
    itemStyle?: any;
}
