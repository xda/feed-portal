var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"staging"',
  BASE_URL: '"https://feed-staging.xda-developers.com"',
  CLIENT_ID: '"XDA-FEED-USP-STAGING"'
})
