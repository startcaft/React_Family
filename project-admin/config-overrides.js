/**
 * Created by Administrator on 2018/5/15.
 */

const { injectBabelPlugin } = require('react-app-rewired');
const rewireMobX = require('react-app-rewire-mobx');
const rewireLess = require('react-app-rewire-less');
module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
    config = rewireLess(config, env);
    config = rewireMobX(config,env);
    return config;
};