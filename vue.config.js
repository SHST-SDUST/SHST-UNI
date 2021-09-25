const path = require("path");

module.exports = {
    transpileDependencies: ["shst-campus"],
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.join(__dirname, "./src"),
            },
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: "uniapp-import-loader",
                    // import { CCard } from "shst-campus";
                    // => import CCard from "shst-campus/lib/c-card/c-card";
                    options: {
                        name: "shst-campus",
                        path: "lib",
                    },
                },
            ],
        },
    },
};
