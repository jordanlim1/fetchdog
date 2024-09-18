const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require("path");


module.exports = {
    mode: 'development',
    entry: './client/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },
            {
                test:  /.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/env',
                            '@babel/react'
                        ]
                    },
                    
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader'] 
            },
           
        ]
    },
    resolve: {
        extensions: ['.jsx', '.js', '.tsx', '.ts']
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: 'Development',
            template: 'index.html'
        })
    ]  
}