var merge = require('webpack-merge')
var stagingEnv = require('./staging.env')

module.exports = merge(stagingEnv, {
  NODE_ENV: '"development"'
})
