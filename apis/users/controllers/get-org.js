const {db} = require('../../../migrations/sequelize')

async function getOrg(req, res) {
  try {
    return res.send('org')
  } catch (error) {
    console.log(error)
    return res.json({
      status: 400,
      message: "operation error"
    })
  }
}

module.exports = getOrg