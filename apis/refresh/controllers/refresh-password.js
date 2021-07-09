const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const {db} = require('../../../migrations/sequelize.js')
const user = require('../../../migrations/sequelize_models/users.js')
const {v4} = require('uuid')

async function refreshPassword(req, res) {
  try {
    const {url, login} = req.params
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({message: "Ошибка при регистрации", errors})
    }

    const urlExist = await amqpClient.sendRPCMessage(
      await channel, {login: user.login, url: url}, 'rpc_check_url'
    ).then(msg => {
      return parseInt(msg.toString('hex'), 16)
    })
    
    if (url && urlExist) {
      newpass = v4().split('-').pop()

      const user = await db.Users.findOne({
        where: {
          login: login
        }
      })

      user.password = bcrypt.hashSync(newpass, 8)
      user.save()

      return res.send(`
        <h1>Восстановление доступа подтверждено</h1>
        <p>Выш логин: ${user.login}</p>
        <p>Ваш новый пароль: ${newpass}</p>
      `) 
    } else {
      return res.send(`
        <h1>Ссылка недействительно</h1>
      `)
    }
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "registration error"})
  }
}

module.exports = refreshPassword