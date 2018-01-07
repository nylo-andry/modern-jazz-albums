const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack.config.dev');

const compiler = webpack(config);

const config = {
  host: 'http://localhost',
  port: 8000,
};

compiler.plugin('done', () => {
  console.log(`App is running at ${config.host}:${config.port}`);
});

const server = new WebpackDevServer(compiler, {
  historyApiFallback: true,
  hot: true,
  contentBase: './public',
  stats: 'errors-only',
});

server.listen(config.port);