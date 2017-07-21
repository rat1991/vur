var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  LOCAL_ROOT: '"/system/client/"',
  SERVER_ROOT: '"http://192.168.199.10:8080/system"',
})
