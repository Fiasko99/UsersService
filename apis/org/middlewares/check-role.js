const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET || require('../../../localhost.config').JWT_SECRET

module.exports = function (accessRole) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }

    try {
      const token = req.headers.authorization
      if (!token) {
        return res.json({
          status: 403,
          message: "Пользователь не авторизован"
        })
      }
      
      const tokenData = jwt.verify(token.split(' ')[1], jwtSecret)
      if (!accessRoles.includes(tokenData.role)) {
        return res.json({
          status: 403,
          message: "У вас нет доступа"
        })
      }
      next()
    } catch (e) {
      console.log(e)
      return res.json({
        status: 403,
        message: "Пользователь не авторизован"
      })
    }
  }
}