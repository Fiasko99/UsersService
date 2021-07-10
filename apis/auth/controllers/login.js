const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const {amqpClient, channel} = require('../../../amqp')
const {validationResult} = require('express-validator')
const {db} = require('../../../migrations/sequelize.js')
const bcrypt = require('bcryptjs')
const generateAccessToken = require('../../../jwt/jwt')
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET || require('../../../localhost.config').JWT_SECRET

async function login(req, res) {
  try {
    const {login, password} = req.body

    const data = {
      login: login
    }
    
    tokenExist = await amqpClient.sendRPCMessage(
      await channel, 
      data, 
      'rpc_check_jwt'
    )
    .then(msg => {
      return parseInt(msg.toString('hex'), 16)
    })
    
    auth = req.headers.authorization
    token = auth ? auth.split(' ')[1] : 'null'
    verifyData = null 
    try {
      jwt.verify(token, jwtSecret) 
    } catch (error) {
      
    }
    
    if(tokenExist && verifyData) {
      return res.json({
        token: token,
        user: verifyData
      })
    }

    if (!login && !password && !tokenExist) {
      return res.json({message: "Нет данных для авторизации"})
    }

    if (tokenExist && !verifyData) {
      const user = await db.Users.findOne({
        attributes: ['login', 'email', 'name', 'password'],
        where: {
          login: login
        },
        include: ['role']
      })
      data.token = generateAccessToken(user)
      amqpClient.sendRPCMessage(
        await channel, 
        data, 
        'rpc_create_jwt'
      )
      return res.json({
        token: data.token,
        user: jwt.verify(data.token, jwtSecret)
      })
    }

    if (!tokenExist && login && password) {
      const user = await db.Users.findOne({
        attributes: ['login', 'email', 'name', 'password'],
        where: {
          login: login
        },
        include: ['role']
      })

      if (!user) {
        return res.status(404).json({message: "Пользователь не существует"})
      } 

      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({message: "Неверный пароль"})
      }

      data.token = generateAccessToken(user)
      amqpClient.sendRPCMessage(
        await channel, 
        data, 
        'rpc_create_jwt'
      )
      return res.json({
        token: data.token,
        user: jwt.verify(data.token, jwtSecret)
      })
    }

    if (!tokenExist && login) {
      return res.json({message: 'Перезагрузка'})
    }

  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "Ошибка процесса авторизации"})
  }
}

module.exports = login