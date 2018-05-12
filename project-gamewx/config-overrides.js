/**
 * Created by startcaft on 2018/4/24.
 */


const { injectBabelPlugin } = require('react-app-rewired');
const rewireMobX = require('react-app-rewire-mobx');
module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd-mobile', style: 'css' }], config);
    config = rewireMobX(config,env);
    return config;
};