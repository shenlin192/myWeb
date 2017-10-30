/**
 * Created by shenlin on 24/10/2017.
 * output path must be an absolute path
 * path.resolve(__dirname,'dist') is necessary
 */
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        signup:'./client/src/js/signup.js',
        cv: './client/src/js/cv.js'
    },
    output: {
        path: path.resolve(__dirname,'./client/dist/'),
        filename: 'js/[name].bundle.js',
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract([ 'css-loader' ])
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.ico$/],
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'img/[name].[hash:8].[ext]',
                    publicPath: '/'
                }
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]
            },
        ],
    },
    // resolve: {
    //     alias: {
    //         jQuery: 'jquery/dist/jquery.js'
    //     }
    // },
    // resolve: {
    //     modules: [
    //         path.resolve('./views'),
    //         path.resolve('./node_modules')
    //     ]
    // },
    plugins:[
        new ExtractTextPlugin({
            filename: 'css/[name].css'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'views', 'cv.html'),
            inject: 'body',
            chunks: ['cv'],
            filename: 'cv.html'
        }),
        new CleanWebpackPlugin(['client/dist'])
    ]
};
