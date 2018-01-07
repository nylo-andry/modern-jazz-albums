const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = require('./paths');

const webpackBaseConfig = require('./webpack.config.base');

module.exports = Object.assign({}, webpackBaseConfig, {
  entry: {
    app: './src/js/index.js',
    vendor: ['firebase'],
  },
  output: {
    filename: 'app.[hash].js',
    path: paths.dist,
  },
  plugins: [
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      template: paths.indexHtml,
    }),
    new UglifyJsPlugin(),
    new ExtractTextPlugin('styles.[hash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash].js',
      minChunks: Infinity,
    }),
    new CopyWebpackPlugin([
      { from: paths.public },
    ]),
  ],
});
