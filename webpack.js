var path = require('path');
var webpack = require('webpack');
var ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);
var ModuleConcatPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

module.exports = {
  entry: process.env.IONIC_APP_ENTRY_POINT,
  output: {
    path: '{{BUILD}}',
    publicPath: 'build/',
    filename: '[name].js',
    devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),
  },
  devtool: process.env.IONIC_SOURCE_MAP_TYPE,

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [path.resolve('node_modules')]
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.ts$/,
        loader: process.env.IONIC_WEBPACK_LOADER
      },
      {
        test: /\.js$/,
        loader: process.env.IONIC_WEBPACK_TRANSPILE_LOADER
      }
    ]
  },

  plugins: [
    ionicWebpackFactory.getIonicEnvironmentPlugin(),
    ionicWebpackFactory.getCommonChunksPlugin(),
    new ModuleConcatPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /dist[\\\/]scss[\\\/]ionicons-icons.scss$/,
      path.join(__dirname, '/src/theme/ionicons-icons.scss')
    ),
    new webpack.DefinePlugin({
        __DEV__: process.env.IONIC_ENV === 'dev',
        __PROD__: process.env.IONIC_ENV === 'prod',
        __APIURI__: JSON.stringify(process.env.IONIC_ENV === 'prod' 
          ? '//twitter-pwa.julienrenaux.fr/'
          : `//127.0.0.1:${process.env.SERVER_PORT || 5000}/`)
    }),  
  ],

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};