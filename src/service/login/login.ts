import { service } from "../index";

import { IAccount, ILoginRequest } from "./types";
import { IDataType } from "../types";

enum LoginAPI {
    AccountLogin = "/login",
    LoginUserInfo = "/users/", //  user/1
    UserMenus = "/role/" //  role/1/menu
}
export function accountLoginRequest(account: IAccount) {
    return service.post<IDataType<ILoginRequest>>({
        url: LoginAPI.AccountLogin,
        data: account
    });
}
export function requestUserInfoById(id: number) {
    return service.get<IDataType>({
        url: LoginAPI.LoginUserInfo + id
    });
}
export function requestUserMenusByRoleId(id: number) {
    return service.get<IDataType>({
        url: LoginAPI.UserMenus + id + "/menu"
    });
}
