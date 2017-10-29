/**
 * Created by shenlin on 24/10/2017.
 * output path must be an absolute path
 * path.resolve(__dirname,'dist') is necessary
 */
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
//
var extractPlugin = new ExtractTextPlugin({
    filename: 'signup.css'
});

module.exports = {
    entry: {
        signup:'./client/src/js/signup.js'
    },
    output: {
        path: path.resolve(__dirname,'./client/dist'),
        filename: 'signup.js',
        publicPath: '/dist'
    },
    module:{
        rules:[
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
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
    plugins:[
        // new webpack.optimize.UglifyJsPlugin({
        //
        // })
        extractPlugin,
        new CleanWebpackPlugin(['client/dist'])
    ]
};
