
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    devtool:'inline-source-map',
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle-[hash].js'
    },
    devServer:{
        contentBase:path.resolve(__dirname,'dist'), //最好设置成绝对路径
        host:'localhost',
        port:5678,
        open:true
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:'css-loader'
            },
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.join(__dirname, 'src')
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'Hello Webpack',
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(path.join(__dirname, 'dist')),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}