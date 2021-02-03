/**
 * This file used to config ant design - less theme
 * By default the project will create some rules to handle less files
 */
const path = require('path');

const readAntdCustomizeLess = (filename) => {
  const fs = require('fs');
  if (!fs.existsSync(filename)) return false;
  return fs.readFileSync(filename, 'utf8');
};

function createRuleLoaders(mainRule, modifyVars, contextOptions) {
  const loaders = mainRule.use;

  return loaders.map(ruleOrLoader => {
    let rule;
    if (typeof ruleOrLoader === 'string') {
      rule = {
        loader: ruleOrLoader,
        options: {}
      };
    } else {
      rule = ruleOrLoader;
    }

    if (rule.loader.includes(`css-loader`)) {
      return {
        loader: rule.loader,
        options: {
          ...rule.options,
          modules: false,
        }
      }
    } else if (rule.loader.includes(`sass-loader`) || rule.loader.includes(`less-loader`)) {
      const defaultLessLoaderOptions = {
        sourceMap: contextOptions.sourceMap
      };
      return {
        ...rule,
        loader: require.resolve('less-loader'),
        options: {
          ...defaultLessLoaderOptions,
          ...rule.options,
          modifyVars,
          javascriptEnabled: true,
        }
      };
    }
    return rule;
  });
}

module.exports = function (webpackConfig, context) {
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
    const lessToJs = require('less-vars-to-js');
    modifyVars = lessToJs(antdCustomVarsLess)
  }


  const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf);
  if (!oneOfRule) {
    throwError(
      `Can't find a 'oneOf' rule under module.rules in the ${configuration} webpack config!`,
      'webpack+rules+oneOf'
    );
  }

  const sassRule = oneOfRule.oneOf.find(
    rule => rule.test && rule.test.toString().includes('scss|sass')
  );
  if (!sassRule) {
    throwError(
      `Can't find the webpack rule to match scss/sass files in the ${configuration} webpack config!`,
      'webpack+rules+scss+sass'
    );
  }

  const firstLessRuleIndex = oneOfRule.oneOf.findIndex(
    rule => rule.test && rule.test.toString().includes('.less')
  );

  const firstLessRule = oneOfRule.oneOf[firstLessRuleIndex];

  const lessRule = {
    exclude: /\.module\.(less)$/,
    test: /node_modules[\/\\]antd.*\.less$/,
    use: []
  };

  lessRule.use = createRuleLoaders(firstLessRule || sassRule, modifyVars, contextOptions);

  if (firstLessRuleIndex >= 0) {
    oneOfRule.oneOf.splice(firstLessRuleIndex - 1, 0, lessRule);
  } else {
    oneOfRule.oneOf.push(lessRule);
  }
  return webpackConfig;
}
