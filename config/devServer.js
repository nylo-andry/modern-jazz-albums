const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack.config.dev');
const { devServer } = require('./variables');

const compiler = webpack(config);

compiler.plugin('done', () => {
  console.log(`App is running at ${devServer.host}:${devServer.port}`);
});

const server = new WebpackDevServer(compiler, {
  historyApiFallback: true,
  hot: true,
  contentBase: './public',
  stats: 'errors-only',
});

server.listen(devServer.port);