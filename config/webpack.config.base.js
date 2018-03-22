const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = require('./paths');

module.exports = {
  resolve: {
    alias: {
      '@elm': paths.elm,
      '@js': paths.js,
      '@sass': paths.sass,
      '@assets': paths.assets,
      '@reason': paths.reason,
    },
    extensions: ['.js', '.elm', '.scss', 're'],
  },
  module: {
    rules: [
      {
        test: /\.elm?$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [
          'elm-hot-loader',
          'elm-webpack-loader',
        ],
      },
      {
        test: /\.(re|rei|ml|mli)$/,
        use: [
          {
            loader: require.resolve('bs-loader')
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [paths.nodeModules],
              },
            },
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
};
