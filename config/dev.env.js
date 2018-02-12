var merge = require('webpack-merge')
var stagingEnv = require('./staging.env')

module.exports = merge(stagingEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"https://feed-staging.xda-developers.com"',
  REDIRECT_URL: '"http://feed.xda-developers.local:8085"',
  CLIENT_ID: '"XDA-FEED-USP-DEV"',
  DEV_CONVERT_TOKEN_CLIENT_ID: 'OQXDVTsC1I9RX1jppm9Za57lIXJCYtcTtBruR9h5',
  DEV_CONVERT_TOKEN_CLIENT_SECRET: 'jPrGDrgAb6qXnvo6wZWhUqHaryO0U67G6EW6wrjypskbGYcxEAYApZJVbqwuAC05uIgiSzmmACsshqeNhDwlFSW6C5c7E0Yi613yYQHXgbiHIaodV9va1aI6KRWDxhNa'
})
