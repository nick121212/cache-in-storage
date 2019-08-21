const path = require("path");
const webpack = require("webpack");
const env = process.env.NODE_ENV || "none";

module.exports = {
    entry: path.resolve("./src/index.ts"),
    // devServer: devServer,
    devtool: "source-map",
    mode:"development",
    module: {
        rules: [{
            test: /\.ts?$/,
            loaders: ["babel-loader", "ts-loader"]
        }]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": JSON.stringify(env),
        }
    })],
    output: {
        path: path.resolve("./dist"),
        filename:  "index.dev.js",
        libraryTarget: "commonjs2",
        sourceMapFilename: "index.dev.js.map",
        library: "JSFCORE",
    }
};