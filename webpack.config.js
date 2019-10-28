const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './src/js/index.jsx'),
    output: {
        path: path.join(__dirname, './dist/js'),
        libraryTarget: 'window',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".js", ".jsx", ".scss"]
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
                test: /\.(sa|sc|c)ss$/,
                include: path.join(__dirname, './src/scss'),
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'style-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    devServer: {
        publicPath: "/",
        contentBase: "./"
    },
    plugins: [
        //new HtmlWebpackPlugin({
        //   filename: 'index2.html',
        //   template: path.join(__dirname, 'index.html')
        //}),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
    ],
};