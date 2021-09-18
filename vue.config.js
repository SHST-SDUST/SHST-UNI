const path = require("path");

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.join(__dirname, "./src"),
                "@shst-campus": path.join(__dirname, "./node_modules/shst-campus"),
            },
        },
    },
};
