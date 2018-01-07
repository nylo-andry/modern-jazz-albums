const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack.config.dev');
const devServerConfig = require('./devServerConfig');

const compiler = webpack(config);

compiler.plugin('done', () => {
  console.log(`App is running at ${devServerConfig.host}:${devServerConfig.port}`);
});

const server = new WebpackDevServer(compiler, {
  historyApiFallback: true,
  hot: true,
  contentBase: './public',
  stats: 'errors-only',
});

server.listen(devServerConfig.port);