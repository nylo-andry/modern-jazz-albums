const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = require('./paths');
const devServerConfig = require('./devServerConfig');

const webpackBaseConfig = require('./webpack.config.base');

module.exports = Object.assign({}, webpackBaseConfig, {
  entry: [
    `webpack-dev-server/client?${devServerConfig.host}:${devServerConfig.port}`,
    'webpack/hot/only-dev-server',
    './src/js/index.js',
  ],
  output: {
    filename: 'app.[hash].js',
    path: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ProgressBarPlugin(),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: paths.indexHtml,
    }),
    new CopyWebpackPlugin([
      { from: paths.public },
    ]),
  ],
});
