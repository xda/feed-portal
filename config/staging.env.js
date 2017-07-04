var merge = require('webpack-merge')
var stagingEnv = require('./staging.env')

module.exports = merge(stagingEnv, {
  NODE_ENV: '"staging"',
  BASE_URL: '"https://feed-staging.xda-developers.com"',
  CLIENT_ID: '"XDA-FEED-USP-STAGING"'
})
