const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const Sequelize = require('sequelize')

nameDB = process.env.DATABASE_NAME || require('../localhost.config').DATABASE_NAME
userDB = process.env.DATABASE_USER || require('../localhost.config').DATABASE_USER
passwordDB = process.env.DATABASE_PASSWORD || require('../localhost.config').DATABASE_PASSWORD
hostDB = process.env.DATABASE_HOST || require('../localhost.config').DATABASE_HOST

module.exports = function() {
  return new Sequelize(nameDB, userDB, passwordDB, {
    dialect: 'postgres',
    host: hostDB,
    logging: false
  })
}