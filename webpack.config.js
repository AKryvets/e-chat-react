const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssWebpackPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",
    watch: true,
    entry: {
        public: path.resolve(__dirname, "./src/index.js"),
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "Body.js"
    },
    devServer: {
        port: 3020,
        contentBase: path.resolve(__dirname, "./build"),
        hot: true,
        open: true,
        watchContentBase: true,
        watchOptions: {
            ignored: /node_modules/
        },
        writeToDisk: filePath => {
            return /(index.html$)|(bundle.js$)|(style.css$)/.test(filePath)
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {test: /\.html$/, use: "html-loader"},
            {test: /\.less$/, use: [CssWebpackPlugin.loader, "css-loader", "less-loader"]},
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: './images',
                        },
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html"),
            filename: "index.html"
        }),
        new CssWebpackPlugin({
            filename: "style.css"
        })
    ],
};