const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: 3000,
}

let envConfig = {}

switch (env) {
  case 'dev':
  case 'development':
    envConfig = require('./dev')
    break
  case 'test':
  case 'testing':
    envConfig = require('./testing')
    break
  case 'prod':
  case 'production':
    envConfig = require('./production')
}

module.exports = Object.assign(baseConfig, envConfig)
