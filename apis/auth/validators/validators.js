const register = require('./validate-register.js')
const login = require('./validate-login.js')
const recovery = require('./validate-recovery.js')

module.exports = {
  register,
  login,
  recovery
}