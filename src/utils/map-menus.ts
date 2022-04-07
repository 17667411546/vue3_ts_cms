import { IBreadcrumb } from "@/base-ui/breadcrumb";
import { RouteRecordRaw } from "vue-router";
let firstMenu: any = null;
export function mapMenuToRoutes(userMenus: any[]): RouteRecordRaw[] {
    //存储动态路由变量
    const routes: RouteRecordRaw[] = [];
    //1.先加载所有的routes
    const allRoutes: RouteRecordRaw[] = [];
    //webpack 方法 require.context(文件夹名称,是否递归查询(往下级去找)，匹配哪些文件) 获取文件
    const routerFiles = require.context("../router/main", true, /\.ts/);
    routerFiles.keys().forEach((key) => {
        //拿到所有路径 ./system/department/department.ts 格式 把.去除
        const route = require("../router/main" + key.split(".")[1]);
        //所有的路由对象
        allRoutes.push(route.default);
    });
    // console.log(allRoutes);

    //2.根据菜单获取需要添加的routes

    const _recurseGetRoute = (menus: any[]) => {
        for (const menu of menus) {
            if (menu.type === 2) {
                const route = allRoutes.find((route) => route.path === menu.url);
                if (!firstMenu) firstMenu = menu;
                if (route) routes.push(route);
            } else {
                _recurseGetRoute(menu.children);
            }
        }
    };
    _recurseGetRoute(userMenus);
    return routes;
}
export function pathMapToMenu(
    userMenus: any[],
    currentPath: string,
    breadcrumbs?: IBreadcrumb[]
): any {
    for (const menu of userMenus) {
        if (menu.type === 1) {
            const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
            if (findMenu) {
                //没有外层路由
                // breadcrumbs?.push({ name: menu.name, path: menu.url });
                // breadcrumbs?.push({ name: findMenu.name, path: findMenu.url });
                breadcrumbs?.push({ name: menu.name });
                breadcrumbs?.push({ name: findMenu.name });
                return findMenu;
            }
        } else if (menu.type === 2 && menu.url === currentPath) {
            return menu;
        }
    }
}
export function pathMapBreadcrumb(userMenus: any[], currentPath: string) {
    const breadcrumbs: IBreadcrumb[] = [];
    pathMapToMenu(userMenus, currentPath, breadcrumbs);
    return breadcrumbs;
}
//获取按钮权限
export function mapMenusToPermissions(userMenus: any[]) {
    const permissions: string[] = [];
    //递归函数
    const _recurseGetPermission = (menus: any[]) => {
        for (const menu of menus) {
            if (menu.type === 1 || menu.type === 2) {
                _recurseGetPermission(menu.children ?? []);
            } else if (menu.type === 3) {
                permissions.push(menu.permission);
            }
        }
    };
    _recurseGetPermission(userMenus);
    return permissions;
}
//树状数据回显
export function menuMapLeafKeys(menuList: any[]) {
    const leftKeys: number[] = [];
    const _recureseGetLeaf = (menuList: any[]) => {
        for (const menu of menuList) {
            if (menu.children) {
                _recureseGetLeaf(menu.children ?? []);
            } else {
                leftKeys.push(menu.id);
            }
        }
    };
    _recureseGetLeaf(menuList);
    return leftKeys;
}
export { firstMenu };
