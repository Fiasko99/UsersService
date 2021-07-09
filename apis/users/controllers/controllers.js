const getUsers = require('./get-users')
const getUser = require('./get-user')
const getOrgs = require('./get-orgs')
const getOrg = require('./get-org')
const searchOrg = require('./search-org')
const searchUser = require('./search-user')
const updateUser = require('./update-user')
const deleteUser = require('./delete-user')

module.exports = {
  getOrgs,
  getOrg,
  searchOrg,
  searchUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser
}