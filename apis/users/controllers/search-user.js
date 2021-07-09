const {db} = require('../../../migrations/sequelize')

async function searchUser(req, res) {
  try {
    const user = await db.Users.findOne({
      attributes: {exclude: ['password']},
      where: {
        email: req.params.email
      }
    })
    if (!user) {
      return res.json({
        status: 404, 
        message: 'User not found'
      })
    } else {
      return res.json(user)
    }
  } catch (error) {
    console.log(error)
    return res.json({
      status: 400,
      message: "operation error"
    })
  }
}

module.exports = searchUser