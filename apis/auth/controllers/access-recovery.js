const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const nodemailer = require("nodemailer")
const {validationResult} = require('express-validator')
const {db} = require('../../../migrations/sequelize.js')
const {v4} = require('uuid')
const { amqpClient, channel } = require('../../../amqp.js')

serserDomain = process.env.RESET_PASSWORD_DOMAIN || `${
  require('../../../localhost.config').SERVER_HOST
}:${
  require('../../../localhost.config').SERVER_PORT
}`
async function recovery(req, res) {
  try {
    const {email, login} = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({message: "Ошибка при регистрации", errors})
    }

    const user = await db.Users.findOne({
      where: {
        login: login,
        email: email
      }
    })
    if (!user) {
      return res.status(400).json({message: "Пользователь не существует"})
    }
    
    return res.json(await resetPassword(user).catch(console.error))
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "login error"})
  }
}

module.exports = recovery

async function resetPassword(user) {
  let transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true, 
    auth: {
      user: process.env.MAIL_ADDRESS, 
      pass: process.env.MAIL_PASSWORD, 
    },
  })

  route = v4()

  url = `http://${serserDomain}/refresh/${user.login}/${route}`

  let info = await transporter.sendMail({
    from: `Ваш помощник <${process.env.MAIL_ADDRESS}>`, 
    to: user.email, 
    subject: "Восстановление доступа", 
    html: `<p>Чтобы восстановить доступ необходимо перейти по ссылке в течение два часа от момента запроса</p>
    <a href="${url}">Нажмите, чтобы восстановить</a>`
  })

  resp = info.response.split(' ')

  amqpClient.sendRPCMessage(await channel, {login: user.login, url: url}, 'rpc_create_url')

  return {
    status: resp[0],
    message: resp[1]
  }
}