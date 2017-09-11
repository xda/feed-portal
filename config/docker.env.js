var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"docker"',
  BASE_URL: '"http://localhost:8000"',
  CLIENT_ID: '"XDA-FEED-USP-DEV"'
})
