/**
 * Created by shenlin on 24/10/2017.
 * output path must be an absolute path
 * path.resolve(__dirname,'dist') is necessary
 */

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './client/src/js/index.js',
    cv: './client/src/js/cv.js',
    collections: './client/src/js/collections.js',
    construction: './client/src/js/construction.js',
    signup: './client/src/js/signup.js',
    login: './client/src/js/login.js',
    reset: './client/src/js/reset.js',

  },
  output: {
    path: path.resolve(__dirname, './client/dist/'),
    filename: 'js/[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(['css-loader']),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.ico$/],
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:8].[ext]',
          publicPath: '/',
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0'],
          },
        }],
      },
      {
        test: /\.pug$/,
        exclude: ['/node_modules/'],
        loader: 'pug-loader',
      },
    ],
  },
  // resolve: {
  //     alias: {
  //         jQuery: 'jquery/dist/jquery.js',
  //         "window.jQuery": "jquery/dist/jquery.js"
  //     }
  // },
  // resolve: {
  //     modules: [
  //         path.resolve('./views'),
  //         path.resolve('./node_modules')
  //     ]
  // },
  devServer: {
    contentBase: path.join(__dirname, './client/dist'),
    compress: true,
    port: 9000,
    // publicPath:'./public',
    // proxy: {
    //     '/': {
    //         target: 'http://localhost:8080/',
    //         secure: false
    //     }
    // }

  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery', // this is obligatory for velocity-animation
      Popper: ['popper.js', 'default'], // for bootstrap
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'views', 'index.pug'),
      title: 'Home page',
      inject: 'body',
      chunks: ['index'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'views', 'collections.pug'),
      title: 'Collections',
      inject: 'body',
      chunks: ['collections'],
      filename: 'collections.html',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'views', 'construction.pug'),
      inject: 'body',
      chunks: ['construction'],
      filename: 'construction.html',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'views', 'cv.html'),
      inject: 'body',
      chunks: ['cv'],
      filename: 'cv.html',
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
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'views', 'reset.pug'),
      title: 'Reset Password',
      inject: 'body',
      chunks: ['reset'],
      filename: 'reset.html',
    }),
    new CleanWebpackPlugin(['client/dist']),
  ],
};
