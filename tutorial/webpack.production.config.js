const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        // vendor: ['jquery'],
        app: './src/index.js',
        'hello-world': './src/hello-world.js',
        'kiwi': './src/kiwi.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '' // here you can pass the public path of the folder like 'dist/'
    },
    mode: 'production', // to set the environment like production, development, testing
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 3000 // by default webpack doesn't create sepearate chunk in case it is few kb or bytes. To do so you can include minSize property
        }
    },
    module: {
        rules: [
            {
                test: /\.(ttf)$/, /// this rule will apply when .ttf file encounters
                type:  'asset/resource'
            },
            {
                test: /\.(png|jpg|jpeg)$/, /// this rule will apply when .png/.jpg/.jpeg file encounters
                type:  'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 3 * 1024 // 3 kilobyte, Here you can conditionally change the size of the image to be included as inline or external
                    }
                }
            },
            {
                test: /\.txt/, /// this rule will apply when .txt file encounters
                type:  'asset/source'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader' // if you want to extract the css you need to use MiniCssExtractPlugin loader instead of 'style-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/env' ],
                        plugins: [ '@babel/plugin-proposal-class-properties' ]
                    }
                }
            },
            {
                test: /\.hbs$/,
                use: [
                    'handlebars-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                "**/*",
                path.join(process.cwd(), 'build/**/*') // to explicit clean other folder outside of targeted directory
            ]
        }),
        new HtmlWebpackPlugin({
            filename: 'page-template.html',
            chunks: ['app'], // this is specify in the entry object of this file
            title: "Webpack Handlebar Exaxmple",
            template: 'src/page-template.hbs',
            description: 'Some Description',
            minify: false, // default is true in production
            // filename: 'subfolder/custom_filename.html', // here you can pass the filename of the output html and subfolder name too
            // meta: {
            //     description: 'Some Description' // will include the description meta tag
            // }
        }),
        new HtmlWebpackPlugin({
            filename: 'hello-world.html',
            chunks: ['hello-world'], // this is specify in the entry object of this file
            title: "Hello World",
            template: 'src/page-template.hbs',
            description: 'Hello World',
            minify: false, // default is true in production
            // filename: 'subfolder/custom_filename.html', // here you can pass the filename of the output html and subfolder name too
            // meta: {
            //     description: 'Some Description' // will include the description meta tag
            // }
        }),new HtmlWebpackPlugin({
            filename: 'kiwi.html',
            chunks: ['kiwi'], // this is specify in the entry object of this file
            title: "Kiwi",
            template: 'src/page-template.hbs',
            description: 'Some Description',
            minify: false, // default is true in production
            // filename: 'subfolder/custom_filename.html', // here you can pass the filename of the output html and subfolder name too
            // meta: {
            //     description: 'Some Description' // will include the description meta tag
            // }
        }),
        new webpack.ProvidePlugin({
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
            'jQuery': 'jquery',
            '$': 'jquery'
        })
    ]
}