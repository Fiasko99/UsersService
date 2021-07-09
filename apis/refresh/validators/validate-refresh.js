const {check} = require('express-validator')

module.exports = [
  check('login', "Неверная ссылка")
  .notEmpty(),
  check('url', "Неверная ссылка")
  .notEmpty(),
]