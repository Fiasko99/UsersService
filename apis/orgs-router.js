const Router = require('express')
const router = new Router()
const controllers = require('./org/controllers/controllers')
const roleMiddleware = require('./org/middlewares/check-role')

router.get('/all', roleMiddleware(['organization', 'user']), controllers.getWorkers)
router.post('/set/worker', roleMiddleware(['organization']), controllers.setWorker)
router.post('/update/worker/:phone', roleMiddleware(['organization']), controllers.updateWorker)
router.get('/delete/worker/:phone', roleMiddleware(['organization']), controllers.deleteWorker)
router.get('/get/worker/:phone', roleMiddleware(['organization']), controllers.getWorker)

module.exports = router