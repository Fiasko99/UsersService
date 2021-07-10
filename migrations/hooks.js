// const hooksModels = require('./hooks_models/worker-model')
const {db} = require('./sequelize')

module.exports = function() {
  db.Workers.beforeValidate(async (worker, options) => {
    const user = await db.Users.findOne({
      where: {
        login: worker.orgName
      }
    })
    if (user.roleName != 'organization') {
      throw new Error("Role must be organization")
    }
  })
}