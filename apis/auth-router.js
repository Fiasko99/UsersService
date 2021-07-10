const Router = require('express')
const router = new Router()
const controllers = require('./auth/controllers/controllers')
const validator = require('./auth/validators/validators.js')

router.post('/register', validator.register, controllers.register)
router.post('/login', controllers.login)
router.post('/recovery', validator.recovery, controllers.recovery)

module.exports = router