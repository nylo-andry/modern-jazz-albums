const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { paths } = require('./variables');

function generateBaseConfig(isProduction) {
  return {
    resolve: {
      alias: {
        '@elm': paths.elm,
        '@js': paths.js,
        '@sass': paths.sass,
      },
      extensions: ['.js', '.elm', '.scss'],
    },
    module: {
      rules: [
        {
          test: /\.elm?$/,
          exclude: [/elm-stuff/, /node_modules/],
          use: {
            loader: 'elm-webpack-loader',
            options: {}
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          }
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  // If you are having trouble with urls not resolving add this setting.
                  // See https://github.com/webpack-contrib/css-loader#url
                  url: false,
                  minimize: true,
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,

                  includePaths: [paths.nodeModules]

                }
              }
            ]
          })
        },
      ],
    },
  };
}

module.exports = generateBaseConfig;