const webpack = require('webpack');
const path = require('path');
module.exports = {
    entry: path.join(__dirname, './src/js/main.jsx'),
    output: {
        path: path.join(__dirname, './dist/js'),
        libraryTarget: 'window',
        filename: 'main.js'
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    node: {
        fs: "empty"
    },
    module: {
        rules: [{
                test: /.jsx?$/,
                exclude: /node_modules/,
                include: path.join(__dirname, 'src'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]
            },
            {
                // babel-loader...
            },
            {
                test: /\.(jpe?g|ico|png|gif|svg)$/i,
                loader: 'file-loader?name=img/[name].[ext]'
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ]
    },
    devServer: {
        publicPath: "/",
        contentBase: "./dist"
    },
    plugins: [

    ],
};