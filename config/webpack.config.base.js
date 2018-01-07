const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = require('./paths');

function generateBaseConfig(isProduction) {
  return {
    resolve: {
      alias: {
        '@elm': paths.elm,
        '@js': paths.js,
        '@sass': paths.sass,
        '@assets': paths.assets,
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
                loader: 'css-loader'
              },
              {
                loader: 'sass-loader',
                options: {
                  includePaths: [paths.nodeModules]
                }
              }
            ]
          })
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {}  
            }
          ]
        },
      ],
    },
  };
}

module.exports = generateBaseConfig;