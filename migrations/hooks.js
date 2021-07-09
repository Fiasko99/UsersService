const hooksModels = require('./hooks_models/worker-model')
const {db} = require('./sequelize')

module.exports = function() {
  db.Workers.beforeValidate(hooksModels.workerModel)
}