const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const jwt = require('jsonwebtoken')
const {db} = require('../../../migrations/sequelize')

const jwtSecret = process.env.JWT_SECRET || require('../../../localhost.config').JWT_SECRET

async function getWorkers(req, res) {
  try {
    
    const token = req.headers.authorization.split(' ')[1]
    const tokenData = jwt.verify(token, jwtSecret)

    const workers = await db.Workers.findAll({
      where: {
        orgName: tokenData.login
      }
    })
    
    return res.json(workers.sort((a, b) => {
        if (a.updatedAt > b.updatedAt){
          return -1
        }
        if (a.updatedAt < b.updatedAt){
        return 1
      }
      return 0
    }))

  } catch (error) {
    console.log(error)
    return res.json({
      status: 400,
      message: "operation error"
    })
  }
}

module.exports = getWorkers