const path = require("path");

module.exports = {
    transpileDependencies: ["shst-campus"],
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.join(__dirname, "./src"),
            },
        },
    },
};
