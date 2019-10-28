const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './src/js/index.jsx'),
    output: {
        path: path.join(__dirname, './dist/js'),
        libraryTarget: 'window',
        filename: 'bundle.js'
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
                include: path.join(__dirname, './src/js'),
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
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        publicPath: "/",
        contentBase: "./"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.css"
        })
    ],
};