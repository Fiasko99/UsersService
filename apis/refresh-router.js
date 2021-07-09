const Router = require('express')
const router = new Router()
const controllers = require('./refresh/controllers/controllers')
const validators = require('./refresh/validators/validators')

router.get('/:login/:url', validators.refresh, controllers.refreshPassword)

module.exports = router