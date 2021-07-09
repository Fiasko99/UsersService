const bcrypt = require('bcryptjs')

module.exports = [
  {
    name: "Jone",
    password: bcrypt.hashSync('admin', 8),
    login: 'admin',
    email: 'snakeice2000@mail.ru',
    roleName: 'admin'
  },
  {
    name: "OOO Azbuka",
    password: bcrypt.hashSync('organization', 8),
    login: 'organization',
    email: 'organization@mail.ru',
    roleName: 'organization'
  },
  {
    name: "Jeem",
    password: bcrypt.hashSync('qwerty', 8),
    login: 'simpleuser',
    email: 'simpleuser@mail.ru',
    roleName: 'user'
  },
  {
    name: "moderator",
    password: bcrypt.hashSync('moderator', 8),
    login: 'moderator',
    email: 'moderator@mail.ru',
    roleName: 'moderator'
  }
]