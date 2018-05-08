/* config-overrides.js */

const rewireMobX = require('react-app-rewire-mobx');
module.exports = function override(config, env) {
    //do stuff with the webpack config...

    // use the MobX rewire
    config = rewireMobX(config,env);
    
    return config;
}