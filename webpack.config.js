
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
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
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: 'asset/resource',
              },
           
        ]
    },
    devServer: {
        static: {
          directory: path.join(__dirname, "dist"), //gives an absolute path of the resource that is going to serve
        },
        compress: true,
        open: true,
        hot: true,
        port: 8080,
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './index.html', // Adjust this path if your HTML file is located elsewhere.
        }),
      ],
    
    resolve: {
        extensions: ['.jsx', '.js', '.tsx', '.ts']
    },
   
}