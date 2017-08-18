var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  LOCAL_ROOT: '"/"',
  SERVER_ROOT: '',
  CLIENT_ID: '',
  CLIENT_SECRET: ''
})
