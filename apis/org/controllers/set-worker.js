const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const jwt = require('jsonwebtoken')
const {db} = require('../../../migrations/sequelize')

const jwtSecret = process.env.JWT_SECRET || require('../../../localhost.config').JWT_SECRET

async function setWorker(req, res) {
  try {

    const token = req.headers.authorization.split(' ')[1]
    const tokenData = jwt.verify(token, jwtSecret)
    const {name, email, phone} = req.body
    const worker = await db.Workers.create({
      name: name, 
      email: email,
      phone: phone,
      orgName: tokenData.login
    }).catch(err => {
      console.log(err);
      return res.status(404).json({message: 'Такой работник уже есть.'})
    })
    
    if (worker) {
      return res.json({message: 'Работник успешно добавлен'})
    } else {
      return res.json({message: 'Не удалось добавить работника'})
    }
  } catch (error) {
    return res.json({
      status: 400,
      message: "operation error"
    })
  }
}

module.exports = setWorker