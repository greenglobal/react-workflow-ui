const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

var node_dir = __dirname + '/node_modules';

var config = {
  addVendor: function(name, path) {
    this.resolve.alias[name] = path;
    //this.module.noParse.push(new RegExp(path));
  },
  context: __dirname,
  devtool: 'inline-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './index.js',
      'jquery',
      './vendors/css/jquery-ui.css',
      './css/jquery-ui.theme.min.css',
      './css/style.css'
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.scss', '.js', '.json', '.md'],
    packageMains: ['browser', 'web', 'browserify', 'main', 'style'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ],
    alias: {
      jquery: "jquery/src/jquery",
      'jquery-ui': 'jquery-ui/ui/widgets',
      'jquery-ui-css': 'jquery-ui/../../themes/base'
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel'
    }, {
      test: /\.(scss)$/,
      loader: ExtractTextPlugin.extract("style", "css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap")
    },
    { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
    , {
      test: /\.(txt)$/,
      loader: 'raw',
      include: path.resolve(__dirname, './components/layout/main/modules')
    }, {
      test: /\.(md)$/,
      loader: ExtractTextPlugin.extract('html!highlight!markdown')
    }, {
      test: /\.png$/,
      loader: "url-loader?limit=100000"
    }, , {
      test: /\.svg$/,
      loader: "svg-loader?limit=100000"
    }, ]
  },
  postcss: [autoprefixer],
  plugins: [
    // new webpack.ProvidePlugin({
    //   'fetch': 'imports?self=>global,this=>global!exports?global.fetch!isomorphic-fetch'
    // }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jquery: "jQuery",
        "windows.jQuery": "jquery"
    }),
    new ExtractTextPlugin('docs.css', {
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};

module.exports = config;
