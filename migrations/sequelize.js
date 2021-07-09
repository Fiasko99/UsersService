const {sequelize, db} = require('./init-database')

// accossiation for user->role
db.Users.belongsTo(db.Roles, {
  foreignKey: {
    name: 'roleName',
    allowNull: false
  }
})
db.Roles.hasOne(db.Users, {
  foreignKey: {
    name: 'roleName',
    allowNull: false
  }
})

// accossiation for worker->user
db.Workers.belongsTo(db.Users, {
  foreignKey: {
    name: 'orgName',
    allowNull: false
  }
})
db.Users.hasOne(db.Workers, {
  foreignKey: {
    name: 'orgName',
    allowNull: false
  }
})

module.exports = {
  sequelize,
  db,
}