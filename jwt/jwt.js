const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET || require('../localhost.config').JWT_SECRET

const generateAccessToken = (user) => {
  const payload = {
    name: user.name,
    login: user.login,
    email: user.email,
    role: user.role.name
  }
  return jwt.sign(payload, jwtSecret, {expiresIn: "48h"})
}

module.exports = generateAccessToken