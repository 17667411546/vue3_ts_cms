import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from "vue-router";
import localCache from "@/utils/cache";
import { firstMenu } from "@/utils/map-menus";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/main"
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/index.vue")
    },
    {
        path: "/main",
        name: "main",
        component: () => import("@/views/main/index.vue")
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import("@/views/not-found/not-found.vue")
    }
    // {
    //     path: "/about",
    //     name: "About",
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
    // }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    // history: createWebHashHistory(),
    routes
});
router.beforeEach((to) => {
    if (to.path !== "/login") {
        const token = localCache.getCache("token");
        if (!token) {
            return "/login";
        }
    }
    if (to.path === "/main") return firstMenu.url;
});
export default router;
