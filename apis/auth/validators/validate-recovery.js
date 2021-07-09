const {check} = require('express-validator')

module.exports = [
  check('email', "Email пользователя не может быть пустым")
  .notEmpty(),
  check('login', "Логин пользователя не может быть пустым")
  .notEmpty()
]