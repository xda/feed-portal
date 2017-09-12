var merge = require('webpack-merge')
var stagingEnv = require('./staging.env')

module.exports = merge(stagingEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"http://feed.xda-developers.local:8000"',
  CLIENT_ID: '"XDA-FEED-USP-DEV"'
})
