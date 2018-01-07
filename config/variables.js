const path = require('path');

const SRC_FOLDER = 'src';

const projectRoot = path.resolve(__dirname, '../');
const srcPath = path.join(projectRoot, SRC_FOLDER);
const distPath = path.join(projectRoot, 'dist');
const indexHtml = path.join(srcPath, 'index.html');
const assetsPath = path.join(srcPath, 'assets');
const jsPath = path.join(srcPath, 'js');
const elmPath = path.join(srcPath, 'elm');
const sassPath = path.join(srcPath, 'scss');
const nodeModulesPath = path.join(projectRoot, 'node_modules');

module.exports = {
  paths: {
    root: projectRoot,
    src: srcPath,
    dist: distPath,
    assets: assetsPath,
    js: jsPath,
    elm: elmPath,
    sass: sassPath,
    nodeModules: nodeModulesPath,
    indexHtml,
  },
  devServer: {
    host: 'http://localhost',
    port: 8000,
  },
};