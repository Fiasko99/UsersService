const {db} = require('../../../migrations/sequelize')

async function getOrgs(req, res) {
  try {
    return res.send('orgs')
  } catch (error) {
    console.log(error)
    return res.json({
      status: 400,
      message: "operation error"
    })
  }
}

module.exports = getOrgs