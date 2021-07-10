const {db} = require('../../../migrations/sequelize')

async function getOrgs(req, res) {
  try {
    let orgs = await db.Users.findAll({where: {roleName: 'organization'}})
    let workersInOrgs = []
    for (const org of orgs) {
      const workers = await db.Workers.findAll({where:{orgName:org.login}})
      let data = {
        name: org.name,
        email: org.email,
        workers: workers
      }
      workersInOrgs.push(data)
    }
    
    return res.json(await workersInOrgs)
    
  } catch (error) {
    console.log(error)
    return res.json({
      status: 400,
      message: "operation error"
    })
  }
}

module.exports = getOrgs