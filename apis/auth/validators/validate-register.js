const {check} = require('express-validator')

module.exports = [
  check('name', "Имя пользователя не может быть пустым")
  .notEmpty(),
  check('login', "Логин пользователя не может быть пустым")
  .notEmpty(),
  check('email', "Почта пользователя не может быть пустым")
  .notEmpty(),
  check('password', "Пароль должен быть длиннее 4 и больше 10 символов")
  .isLength(
    {min:4, max:10}
  )
]