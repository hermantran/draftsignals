var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var NodeEnvPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('development')
  }
});

var HotModuleReplacementPluginConfig = new webpack.HotModuleReplacementPlugin();

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

var ExtractTextPluginConfig = new ExtractTextPlugin('[name].css');

var CleanWebpackPluginConfig = new CleanWebpackPlugin(['dist'], {
  root: __dirname,
  verbose: true, 
  dry: false
});

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './app/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react']
      },
      {
        test: /\.(scss|css)$/,
        loaders: ['style', 'css', 'sass']
        // ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  },
  plugins: [
    NodeEnvPlugin,
    HotModuleReplacementPluginConfig,
    HTMLWebpackPluginConfig,
    // ExtractTextPluginConfig,
    CleanWebpackPluginConfig
  ]
};