'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    REFER_URL: '"http://localhost:8080"',
    context: '/crms/vue'
})