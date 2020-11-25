const coreConfigSetup = require('@nrwl/react/plugins/webpack');
// const configStyles = require('./webpack/config-styles');

module.exports = function (webpackConfig, context) {
  webpackConfig = coreConfigSetup(webpackConfig, context);
  // webpackConfig = configStyles(webpackConfig, context);
  return webpackConfig;
}
