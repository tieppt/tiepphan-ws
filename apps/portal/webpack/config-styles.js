const path = require('path');

const readAntdCustomizeLess = (filename) => {
  const fs = require("fs");
  if (!fs.existsSync(filename)) return false;
  return fs.readFileSync(filename, "utf8");
};

module.exports = function(webpackConfig, context) {
  const configuration = context.configuration || 'development';
  const contextOptions = context.buildOptions || context.options;
  const throwError = (message, query) => {
    throw new Error(
      message + '\n' + query
    );
  }

  let modifyVars = {};
  const antdCustomVarsLess = readAntdCustomizeLess(path.join(__dirname, `..${path.sep}src${path.sep}antd.customize.less`));
  if (antdCustomVarsLess) {
    const lessToJs = require("less-vars-to-js");
    modifyVars = lessToJs(antdCustomVarsLess)
  }


  const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf);
  if (!oneOfRule) {
    throwError(
      "Can't find a 'oneOf' rule under module.rules in the " +
      `${configuration} webpack config!`,
      "webpack+rules+oneOf"
    );
  }

  const sassRule = oneOfRule.oneOf.find(
    rule => rule.test && rule.test.toString().includes("scss|sass")
  );
  if (!sassRule) {
    throwError(
      "Can't find the webpack rule to match scss/sass files in the " +
      `${configuration} webpack config!`,
      "webpack+rules+scss+sass"
    );
  }

  const lessRule = {
    exclude: /\.module\.(less)$/,
    test: /\.less$/,
    use: []
  };

  const loaders = sassRule.use;

  loaders.forEach(ruleOrLoader => {
    let rule;
    if (typeof ruleOrLoader === "string") {
      rule = {
        loader: ruleOrLoader,
        options: {}
      };
    } else {
      rule = ruleOrLoader;
    }

    if (
      rule.loader.includes(`style-loader`)
    ) {
      lessRule.use.push({
        loader: rule.loader,
        options: {
          ...rule.options,
        }
      });
    } else if (rule.loader.includes(`css-loader`)) {
      lessRule.use.push({
        loader: rule.loader,
        options: {
          ...rule.options,
        }
      });
    } else if (rule.loader.includes(`postcss-loader`)) {
      lessRule.use.push({
        loader: rule.loader,
        options: {
          ...rule.options,
        }
      });
    } else if (rule.loader.includes(`resolve-url-loader`)) {
      lessRule.use.push({
        loader: rule.loader,
        options: {
          ...rule.options,
        }
      });
    } else if (rule.loader.includes(`mini-css-extract-plugin`)) {
      lessRule.use.push({
        loader: rule.loader,
        options: {
          ...rule.options,
        }
      });
    } else if (rule.loader.includes(`sass-loader`)) {
      const defaultLessLoaderOptions = {
        sourceMap: contextOptions.sourceMap
      };
      lessRule.use.push({
        loader: require.resolve("less-loader"),
        options: {
          ...defaultLessLoaderOptions,
          modifyVars,
          javascriptEnabled: true,
        }
      });
    } else {
      throwError(
        `Found an unhandled loader in the ${configuration} webpack config: ${rule.loader}`,
        "webpack+unknown+rule"
      );
    }
  });
  oneOfRule.oneOf.push(lessRule);

  // config sass-resources-loader
  webpackConfig.module.rules.forEach((rule) => {
    if (Object.prototype.hasOwnProperty.call(rule, 'oneOf')) {
      rule.oneOf.forEach((oneOf) => {
        if (
          oneOf.test && oneOf.use &&
          (`${oneOf.test}`.includes('scss') || `${oneOf.test}`.includes('sass'))
        ) {

          oneOf.use.push({
            loader: 'sass-resources-loader',
            options: {
              resources: contextOptions.styles.map(style => path.join(contextOptions.root, style)),
            },
          })
        }
      });
    }
  });

  return webpackConfig;
}
