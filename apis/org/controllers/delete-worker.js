const {db} = require('../../../migrations/sequelize')

async function deleteWorker(req, res) {
  try {
    const phone = req.params.phone
    const worker = await db.Workers.findOne({
      where: {
        phone: phone
      }
    })
    if (worker) {
      worker.destroy()
      return res.json({success: true})
    } else {
      return res.json({success: false})
    }
  } catch (error) {
    console.log(error)
    return res.json({
      status: 400,
      message: "operation error"
    })
  }
}

module.exports = deleteWorker