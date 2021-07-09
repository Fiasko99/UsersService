const {db} = require('../../../migrations/sequelize')

async function searchOrgs(req, res) {
  try {
    return res.send('search org')
  } catch (error) {
    console.log(error)
    return res.json({
      status: 400,
      message: "operation error"
    })
  }
}

module.exports = searchOrgs