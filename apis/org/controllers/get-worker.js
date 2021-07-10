const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const {db} = require('../../../migrations/sequelize')
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET || require('../../../localhost.config').JWT_SECRET

async function getWorker(req, res) {
  try {
    const phone = req.params.phone

    const token = req.headers.authorization.split(' ')[1]
    const tokenData = jwt.verify(token, jwtSecret)

    const worker = await db.Workers.findOne({where:{phone: phone, orgName: tokenData.role}})
    if (worker) {
      return res.json(worker)
    }
  } catch (error) {
    console.log(error)
    return res.json({
      status: 400,
      message: "operation error"
    })
  }
}

module.exports = getWorker