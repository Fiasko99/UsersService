const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const bodyParser = require("body-parser")
const express = require('express')
const {sequelize} = require('./migrations/sequelize.js')
const createMigration = require('./migrations/migrations')
const createHooks = require('./migrations/hooks')
const auth = require('./apis/auth-router')
const users = require('./apis/users-router')
const orgs = require('./apis/orgs-router')
const refresh = require('./apis/refresh-router')
const cors = require('cors')

app = express()

const port = process.env.SERVER_PORT || require('./localhost.config').SERVER_PORT
const host = process.env.SERVER_HOST || require('./localhost.config').SERVER_HOST

app.use(cors())
app.use(express.json())
app.use('/auth', auth)
app.use('/users', users)
app.use('/orgs', orgs)
app.use('/refresh', refresh)
app.use(express.static('dist'))
app.use(bodyParser.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

app.get('/', async (req, res) => {
  return res.send('<h1>Здесь будет документация</h1>')
})

const start = async function() {
  app.listen(port, async () => {
    await sequelize.sync({ alter: true, force: true})
    createMigration()
    createHooks()
    console.info(`[server] connection DB `)
    console.info(`Server listening on http://${host}:${port}`,)
    console.log(`_`.repeat(48))
  })
}
start() 