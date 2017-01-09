var webpack = require('webpack');
var path = require('path');
var devConfig = require('./webpack.config.js');

devConfig.output = devConfig.output || {};
devConfig.output.path = path.join(__dirname, '/gh-pages/');

devConfig.plugins = devConfig.plugins || [];
devConfig.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
}));

module.exports = devConfig;