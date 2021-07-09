const {db} = require('./init-database')
const templates = require('./templates/templates')

// create tamplates
module.exports = function() {
  roles = templates.rolesList
  roles.forEach(name => {
    db.Roles.create({
      name: name
    })
  })

  users = templates.usersList
  users.forEach(user => {
    db.Users.create(user)
  })

  workers = templates.workersList
  workers.forEach(worker => {
    db.Workers.create(worker)
  })
}