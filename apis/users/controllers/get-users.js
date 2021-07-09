const {db} = require('../../../migrations/sequelize')

async function getUsers(req, res) {
  try {
    const users = await db.Users.findAll({
      attributes: ['username', 'login', 'email'],
      where: {
        role: 'user'
      }
    })
    return res.json(users)
  } catch (error) {
    console.log(error)
    return res.json({
      status: 400,
      message: "operation error"
    })
  }
}

module.exports = getUsers