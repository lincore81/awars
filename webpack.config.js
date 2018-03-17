"use strict";
const path = require('path'),
      srcPath = path.resolve(__dirname, 'src'),
      distPath = path.resolve(__dirname, 'dist');

module.exports = {
    context: srcPath,
    entry: path.resolve(srcPath, 'main.js'),
    output: {
        path: path.resolve(distPath, 'js'),
        filename: 'js/bundle.js',
        publicPath: '/' 
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                include: srcPath,
                loader: 'eslint-loader',
                options: {
                    failOnWarning: false,
                    failOnError: true
                }
            },
            {
                test: /\.js$/,
                include: srcPath,
                loader: 'babel-loader',
                options: {
                    //retainLines: true,
                    //cacheDirectory: true
                }
            }
        ]
    },
/*
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
*/
    resolve: {
        extensions: ['.js', '.jsx']
    },
    watch: true,
    devServer: {
        inline: true,
        hot: true,
        contentBase: distPath
    },
    devtool: 'source-map'
};



