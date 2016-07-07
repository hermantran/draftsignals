var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

// Remove React Dev Tools console message
var NodeEnvPluginConfig = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
});

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: '../index.html',
  inject: 'body'
});

var ExtractTextPluginConfig = new ExtractTextPlugin('app.css');

var CleanWebpackPluginConfig = new CleanWebpackPlugin(['dist'], {
  root: __dirname,
  verbose: true, 
  dry: false
});

module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    path: __dirname + '/dist/',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel?presets[]=es2015,presets[]=react']
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      },
      {
        test: /\.png$/,
        loader: 'url'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file?name=fonts/[name].[ext]'
      }
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  },
  plugins: [
    NodeEnvPluginConfig,
    HTMLWebpackPluginConfig,
    ExtractTextPluginConfig,
    CleanWebpackPluginConfig
  ]
};