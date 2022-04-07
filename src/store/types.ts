import type { ILoginState } from "./login/types";
import { ISystemState } from "./main/system/types";
import { IDashboardState } from "./main/analysis/types";

//根模块类型
export interface IRootState {
    name: string;
    entireDepartment: any[];
    entireRole: any[];
    entireMenuTree: any[];
}
//其他模块类型
export interface IRootWithModule {
    login: ILoginState;
    system: ISystemState;
    dashboard: IDashboardState;
}
//组合类型
export type IStoreType = IRootState & IRootWithModule;
