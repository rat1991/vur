var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  LOCAL_ROOT: '"/"',
  SERVER_ROOT: '"//dgzrui.jios.org:8100/hengliang"',
  CLIENT_ID: '"weixin"',
  CLIENT_SECRET: '"123456"'
})
