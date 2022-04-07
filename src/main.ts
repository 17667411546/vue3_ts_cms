import { createApp, App } from "vue";
import "normalize.css";

import rootApp from "./App.vue";
import router from "./router";
import store from "./store";
// import { service } from "./service";
import { globalRegisterApp } from "./global";
import { setupStore } from "@/store";
import "./assets/css/index.sass";

//页面刷新从缓存获取vuex值
setupStore();
// async function fn() {
//     const res = await service.request({
//         url: "/login",
//         method: "POST",
//         data: {
//             name: "coderwhy",
//             password: "123456"
//         }
//     });
//     console.log(res);

//     //单个请求的拦截器
//     setTimeout(async () => {
//         await service
//             .request({
//                 url: "/login",
//                 method: "POST",
//                 data: {
//                     name: "coderwhy",
//                     password: "123456"
//                 },
//                 //单个请求拦截
//                 interceptors: {
//                     requestInterceptor(config) {
//                         // console.log("单个请求拦截成功");
//                         return config;
//                     },
//                     responseInterceptor(res) {
//                         // console.log("单个请求响应拦截成功");
//                         return res;
//                     }
//                 }
//             })
//             .then((res) => {
//                 console.log("2", res);
//             });
//     }, 3000);
// }
const app: App = createApp(rootApp);
//按需引入方式一
// globalRegisterApp(app)
// 按需引入方式二

app.use(globalRegisterApp);

app.use(store).use(router).mount("#app");
