/**
 * Created by shenlin on 24/10/2017.
 * output path must be an absolute path
 * path.resolve(__dirname,'dist') is necessary
 */

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports  = {
    entry: {
        signup:'./client/src/js/signup.js',
        login: './client/src/js/login.js',
        cv: './client/src/js/cv.js'
    },
    output: {
        path: path.resolve(__dirname,'./client/dist/'),
        filename: 'js/[name].bundle.js',
        publicPath:'/'
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
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015','stage-0']
                    }
                }]
            },
            {
                test: /\.pug$/,
                exclude: ['/node_modules/'],
                loader: 'pug-loader',
            },
        ],
    },
    resolve: {
        alias: {
            jQuery: 'jquery/dist/jquery.js'
        }
    },
    // resolve: {
    //     modules: [
    //         path.resolve('./views'),
    //         path.resolve('./node_modules')
    //     ]
    // },
    devServer: {
        contentBase: path.join(__dirname, "./client/dist"),
        compress: true,
        port: 9000,
        proxy: {
            '/': {
                target: 'http://localhost:8080/',
                secure: false
            }
        }

    },
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
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'views', 'signup.pug'),
            title: 'Sign up',
            inject: 'body',
            chunks: ['signup'],
            filename: 'signup.html',
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'views', 'login.pug'),
            title: 'Log in',
            inject: 'body',
            chunks: ['login'],
            filename: 'login.html',
        }),
        new CleanWebpackPlugin(['client/dist'])
    ]
};
