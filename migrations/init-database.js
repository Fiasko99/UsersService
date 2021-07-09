const sequelize = require("./connect-sequelize.js")()
const users = require('./sequelize_models/users.js')
const workers = require('./sequelize_models/workers.js')
const roles = require('./sequelize_models/roles.js')

const Users = sequelize.define('users', users)
const Workers = sequelize.define('workers', workers)
const Roles = sequelize.define('roles', roles)

const db = {
  Users,
  Workers,
  Roles
}

module.exports = {
  sequelize,
  db,
}