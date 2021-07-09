const {db} = require('../../../migrations/sequelize')

async function setWorker(req, res) {
  try {
    return res.send('ok')
  } catch (error) {
    console.log(error)
    return res.json({
      status: 400,
      message: "operation error"
    })
  }
}

module.exports = setWorker