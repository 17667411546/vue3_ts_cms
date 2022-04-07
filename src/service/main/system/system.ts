import { ElMessage } from "element-plus";
import { service } from "../../index";
import { IDataType } from "../../types";
export function getPageListData(url: string, queryInfo: any) {
    return service.post<IDataType>({
        url,
        data: queryInfo
    });
}
// /users/id
export function deletePageData(url: string) {
    return service
        .delete<IDataType>({
            url
        })
        .then((res) => {
            ElMessage({
                message: res.data,
                type: res.code === 0 ? "success" : "error"
            });
        });
}
//新建用户
export function createPageData(url: string, newData: any) {
    return service
        .post<IDataType>({
            url,
            data: newData
        })
        .then((res) => {
            ElMessage({
                message: res.data,
                type: res.code === 0 ? "success" : "error"
            });
        });
}
//编辑用户
export function editPageData(url: string, editData: any) {
    return service
        .patch<IDataType>({
            url,
            data: editData
        })
        .then((res) => {
            ElMessage({
                message: res.data,
                type: res.code === 0 ? "success" : "error"
            });
        });
}
