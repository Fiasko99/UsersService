const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const {db} = require('../../../migrations/sequelize.js')

async function register(req, res) {
  try {
    const {login, password, name, email} = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({message: "Ошибка при регистрации", errors})
    }

    const candidate = await db.Users.findOne({
      where: {
        login: login
      }
    })
    if (candidate) {
      return res.status(400).json({message: "Пользователь существует"})
    }
    const hashPassword = bcrypt.hashSync(password, 8)
    await db.Users.create({
      login: login, 
      password: hashPassword, 
      name: name, 
      email: email
    })
    .then(() => {
      return res.json({message: "Пользователь успешно создан"})
    })
    .catch(err => {
      message = err.parent.detail
      return res.json({message: message})
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "registration error"})
  }
}

module.exports = register