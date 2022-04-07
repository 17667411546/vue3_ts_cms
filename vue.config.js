// const AutoImport = require("unplugin-auto-import/webpack");
// const Components = require("unplugin-vue-components/webpack");
// const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = {
    outputDir: "./build",
    // publicPath: "./",
    configureWebpack: {
        resolve: {
            alias: {
                views: "@/views"
            }
        }
        // plugins: [
        //     AutoImport({
        //         resolvers: [ElementPlusResolver()]
        //     }),
        //     Components({
        //         resolvers: [ElementPlusResolver()]
        //     })
        // ]
    }
};
