const Router = require('express')
const router = new Router()
const controllers = require('./users/controllers/controllers')
const roleMiddleware = require('./users/middlewares/check-role')

// moderator routes for get users
router.get('/all', roleMiddleware(['moderator']), controllers.getUsers)
router.get('/search/:email', roleMiddleware(['moderator']), controllers.searchUser)
router.get('/user/:login', roleMiddleware(['moderator']), controllers.getUser)

// users routes for get org
router.get('/orgs/all', controllers.getOrgs)
router.get('/search/org/:login', controllers.searchOrg)
router.get('/org/:login', controllers.searchOrg)

// users routes for profiles options
router.post('/user/update/:login', roleMiddleware(['user', 'moderator', 'organization']), controllers.updateUser)
router.get('/user/delete/:login', roleMiddleware(['user', 'moderator', 'organization']), controllers.deleteUser)

module.exports = router